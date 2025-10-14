import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import connectDB from "../utils/db.js";

dotenv.config();
connectDB();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// STEP 1 — START BOT
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  await bot.sendMessage(
    chatId,
    "👋 Welcome to *FoodCampus*!\n\n🍽 We deliver fresh food directly to your dorm.\n\nPlease share your phone number to continue:",
    {
      parse_mode: "Markdown",
      reply_markup: {
        keyboard: [
          [{ text: "📱 Share Phone Number", request_contact: true }],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    }
  );
});

// STEP 2 — HANDLE CONTACT (PHONE)
bot.on("contact", async (msg) => {
  const chatId = msg.chat.id;
  const phone = msg.contact.phone_number.replace("+", "");
  const name = msg.from.first_name || "User";

  let user = await User.findOne({ phone });
  if (!user) user = await User.create({ telegramId: chatId, name, phone, role: "customer" });

  // STEP 3 — SEND CORRECT PAGE BASED ON ROLE
  if (user.role === "admin") {
    await bot.sendMessage(
      chatId,
      `👋 Hello *${name}*, welcome back Admin!\nAccess your dashboard below.`,
      {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "🛠 Open Admin Dashboard",
                web_app: { url: "https://your-app.vercel.app/admin" },
              },
            ],
          ],
        },
      }
    );
  } else {
    await bot.sendMessage(
      chatId,
      `🍔 Hi *${name}*, welcome to FoodCampus!\nOrder your favorite meal now 👇`,
      {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "🚀 Open Customer Menu",
                web_app: { url: "https://your-app.vercel.app/customer" },
              },
            ],
          ],
        },
      }
    );
  }
});

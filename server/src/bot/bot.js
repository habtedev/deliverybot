import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import connectDB from "../utils/db.js";

dotenv.config();
connectDB();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// 🔹 Base URL (Frontend)
const FRONTEND_URL = (process.env.FRONTEND_URL || "https://dormdres.vercel.app").replace(/\/$/, "");

// 🪩 STEP 1 — Start the bot
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  await bot.sendMessage(chatId, 
    "👋 እንኳን ደህና መጡ *FoodCampus*!\n\n🍽 እባክዎ ስልክ ቁጥርዎን ይጋሩ እንድንቀጥል።",
    {
      parse_mode: "Markdown",
      reply_markup: {
        keyboard: [[{ text: "📱 ስልክ ቁጥር አጋራ", request_contact: true }]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    }
  );
});

// 🪩 STEP 2 — Handle Contact (Phone)
bot.on("contact", async (msg) => {
  const chatId = msg.chat.id;
  const phone = msg.contact.phone_number.replace("+", "");
  const name = msg.from.first_name || "User";

  let user = await User.findOne({ phone });
  if (!user) {
    user = await User.create({ telegramId: chatId, name, phone, role: "customer" });
  }

  // Generate secure JWT token
  const payload = { name: user.name, phone: user.phone, role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });

  // Build redirect URL to frontend's /auth/redirect which will forward token
  const redirectUrl = `${FRONTEND_URL}/auth/redirect?token=${encodeURIComponent(token)}&next=${encodeURIComponent(user.role)}`;

  // Send Telegram response
  if (user.role === "admin") {
    await bot.sendMessage(
      chatId,
      `👋 ሰላም *${name}*, እንኳን ደህና መጡ አስተዳዳሪ!\n\n🧭 የአስተዳዳሪ ዳሽቦርዱን እዚህ ይክፈቱ 👇`,
      {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "🛠 Admin Dashboard ክፈት",
                web_app: { url: redirectUrl },
              },
            ],
          ],
        },
      }
    );
  } else {
    await bot.sendMessage(
      chatId,
      `🍔 ሰላም *${name}*, እንኳን ደህና መጡ *FoodCampus*!\n\nትእዛዝዎን እንዲሰጡ እዚህ ይጫኑ 👇`,
      {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "🚀 የደንበኛ መነሻ ገፅ ክፈት",
                web_app: { url: redirectUrl },
              },
            ],
          ],
        },
      }
    );
  }
});

// 🧩 Optional: Fallback for unknown commands
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  if (!msg.contact && !msg.text.startsWith("/")) {
    await bot.sendMessage(chatId, "📍 እባክዎ /start ይጫኑ ወይም ስልክ ቁጥር ያጋሩ።");
  }
});

// deliverybot/server/src/bot/bot.js
// 📦 Imports
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import connectDB from "../utils/db.js";

// 🌍 Load environment variables
dotenv.config();
connectDB();

// 🤖 Initialize Telegram Bot
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// 🌐 Frontend URLs
const FRONTEND_URL = process.env.FRONTEND_URL;
const CUSTOMER_URL = `${FRONTEND_URL}/customer`;
const ADMIN_URL = `${FRONTEND_URL}/admin`;

// 🔐 JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// 🟢 STEP 1: Start Command
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  await bot.sendMessage(
    chatId,
    `
👋 *Welcome to FoodCampus!*

🍽 እባክዎ ስልክ ቁጥርዎን ይጋሩ እንድንቀጥል።  
👇 ከዚህ ይጫኑ ለመጋራት:
`,
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

// 🟢 STEP 2: Handle Contact
bot.on("contact", async (msg) => {
  try {
    const chatId = msg.chat.id;
    const phone = msg.contact.phone_number.replace("+", "");
    const name = msg.from.first_name || "User";

    // 🧭 Automatically assign admin role to your number
    const isAdmin = phone === "251945870700";

    // 🔎 Find or create user
    let user = await User.findOne({ phone });
    if (!user) {
      user = await User.create({
        telegramId: chatId,
        name,
        phone,
        role: isAdmin ? "admin" : "customer",
      });
    } else if (isAdmin && user.role !== "admin") {
      user.role = "admin";
      await user.save();
    }

    // 🔐 Generate JWT Token
    const payload = { name: user.name, phone: user.phone, role: user.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });

    // Build a frontend redirect URL so the frontend's /auth/redirect can set the cookie
    const baseFrontend = (FRONTEND_URL || 'https://dormdres.vercel.app').replace(/\/$/, '');
    const redirectPath = `/auth/redirect?next=${encodeURIComponent(user.role)}&token=${encodeURIComponent(token)}`;
    const openUrl = `${baseFrontend}${redirectPath}`;

    // 📨 Build message
    const greeting =
      user.role === "admin"
        ? `👋 ሰላም *${name}*, እንኳን ደህና መጡ አስተዳዳሪ!\n\n🧭 የአስተዳዳሪ ዳሽቦርዱን እዚህ ይክፈቱ 👇`
        : `🍔 ሰላም *${name}*, እንኳን ደህና መጡ *FoodCampus*!\n\n🚀 ትእዛዝዎን እንዲሰጡ እዚህ ይጫኑ 👇`;

    const buttonText =
      user.role === "admin"
        ? "🧭 Admin Dashboard ክፈት"
        : "🍱 የደንበኛ ገፅ ክፈት";

    // 💬 Send Message with Inline Button
    await bot.sendMessage(chatId, greeting, {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [[{ text: buttonText, web_app: { url: openUrl } }]],
      },
    });

    console.log(`✅ ${user.role.toUpperCase()} logged in: ${user.name} (${phone})`);
  } catch (error) {
    console.error("❌ Error handling contact:", error);
  }
});

// 🧩 STEP 3: Fallback for Other Messages
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;

  if (msg.contact || msg.text?.startsWith("/")) return;

  await bot.sendMessage(
    chatId,
    "📍 እባክዎ /start ይጫኑ ወይም ስልክ ቁጥር ያጋሩ።",
    { parse_mode: "Markdown" }
  );
});

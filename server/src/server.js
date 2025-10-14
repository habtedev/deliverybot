import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utils/db.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";
import "./bot/bot.js"; // start Telegram bot

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/wallet", walletRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

import express from "express";
import Wallet from "../models/walletModel.js";
const router = express.Router();

// Get all wallets
router.get("/", async (req, res) => {
  const wallets = await Wallet.find().populate("user");
  res.json(wallets);
});

// Get wallet by user ID
router.get("/user/:userId", async (req, res) => {
  const wallet = await Wallet.findOne({ user: req.params.userId }).populate("user");
  if (!wallet) return res.status(404).json({ message: "Wallet not found" });
  res.json(wallet);
});

export default router;

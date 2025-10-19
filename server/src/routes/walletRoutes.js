import express from "express";
import Wallet from "../models/walletModel.js";
import requireAuth from "../middleware/requireAuth.js";
const router = express.Router();

// Get all wallets (protected)
router.get("/", requireAuth, async (req, res) => {
  const wallets = await Wallet.find().populate("user");
  res.json(wallets);
});

// Get wallet by user ID (protected)
router.get("/user/:userId", requireAuth, async (req, res) => {
  const wallet = await Wallet.findOne({ user: req.params.userId }).populate("user");
  if (!wallet) return res.status(404).json({ message: "Wallet not found" });
  res.json(wallet);
});

export default router;

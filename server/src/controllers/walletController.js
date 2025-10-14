import Wallet from "../models/walletModel.js";

// Example: get all wallets
export async function getAllWallets(req, res) {
  const wallets = await Wallet.find().populate("user");
  res.json(wallets);
}

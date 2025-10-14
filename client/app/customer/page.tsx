"use client";
import { motion } from "framer-motion";

export default function WalletPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center bg-orange-50"
    >
      <h1 className="text-3xl font-bold text-orange-600 mb-4">💰 Wallet</h1>
      <p className="text-gray-700">Your current balance: <span className="font-semibold">$0.00</span></p>
    </motion.div>
  );
}

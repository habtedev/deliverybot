"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function WalletPage() {
  // Example balance, replace with real data as needed
  const balance = 120.5;
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-orange-100 p-6 text-center">
      <motion.h2
        className="text-2xl font-bold text-orange-700 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        💰 Wallet
      </motion.h2>
      <motion.div
        className="bg-white rounded-xl shadow-lg p-8 mb-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-gray-600 mb-2">Current Balance</div>
        <div className="text-3xl font-bold text-orange-700 mb-4">${balance.toFixed(2)}</div>
        <button className="px-6 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition font-semibold">Add Funds</button>
      </motion.div>
      <Link
        href="/customer"
        className="px-6 py-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition"
      >
        ⬅ Back
      </Link>
    </main>
  );
}

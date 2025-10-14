"use client";
import { motion } from "framer-motion";

export default function HowToUse() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex flex-col items-center justify-center bg-orange-50"
    >
      <h1 className="text-3xl font-bold text-orange-600 mb-4">📘 How to Use</h1>
      <p className="max-w-lg text-gray-700 text-center">
        1️⃣ Click “Order Now” to start an order.  
        2️⃣ Review your items in “My Orders.”  
        3️⃣ Add money to your “Wallet.”  
        4️⃣ Enjoy your meal delivered fast!
      </p>
    </motion.div>
  );
}

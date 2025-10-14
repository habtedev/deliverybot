"use client";
import { motion } from "framer-motion";

export default function OrderNow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex flex-col items-center justify-center bg-orange-50"
    >
      <h1 className="text-3xl font-bold text-orange-600 mb-4">🛒 Order Now</h1>
      <p className="text-gray-700 max-w-md text-center">
        Choose your favorite meal and order instantly!
      </p>
    </motion.div>
  );
}

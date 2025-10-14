"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminOrdersPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-orange-100 p-6 text-center">
      <motion.h2
        className="text-2xl font-bold text-orange-700 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        📦 Manage Orders
      </motion.h2>
      <p className="text-gray-600 mb-6">View and manage all customer orders here.</p>
      <Link
        href="/admin"
        className="px-6 py-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition"
      >
        ⬅ Back
      </Link>
    </main>
  );
}

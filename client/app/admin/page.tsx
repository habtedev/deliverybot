"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminDashboard() {
  const adminMenu = [
    { title: "📦 Manage Orders", href: "/admin/orders" },
    { title: "👥 Manage Users", href: "/admin/users" },
    { title: "💰 Wallet", href: "/admin/wallet" },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center p-6 bg-gradient-to-br from-orange-100 via-white to-orange-50">
      <motion.h1
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-orange-600 mb-8"
      >
        ⚙️ Admin Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
        {adminMenu.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg p-6 flex items-center justify-between cursor-pointer border border-orange-100 hover:border-orange-400 transition-all"
          >
            <Link href={item.href} className="w-full text-lg font-medium text-orange-700">
              {item.title}
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  );
}

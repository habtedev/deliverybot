"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Package,
  Wallet,
  Info,
  Phone,
  UtensilsCrossed,
  User,
} from "lucide-react";
import React from 'react';
import UnauthorizedPage from '../unauthorized/page';

type UserType = { name?: string; phone?: string; role?: string } | null;

export default function CustomerClient({ user }: { user: UserType }) {
  if (!user) return <UnauthorizedPage />;

  const menu = [
    { icon: <UtensilsCrossed size={28} />, sub: "\u12a0\u1201\u1295 \u12a0\u12d8\u12d9", label: "Order Now", href: "/customer/order", color: "from-orange-500 to-amber-500" },
    { icon: <Package size={28} />, sub: "\u12e8\u12a5\u1294 \u1275\u12d5\u12db\u12de\u127d", label: "My Orders", href: "/customer/my-orders", color: "from-blue-500 to-cyan-500" },
    { icon: <Wallet size={28} />, sub: "\u12cb\u120c\u1275", label: "Wallet", href: "/customer/wallet", color: "from-emerald-500 to-green-500" },
    { icon: <Info size={28} />, sub: "\u1218\u1320\u1240\u121d \u1218\u1295\u1308\u12f5", label: "How to Use", href: "/customer/how-to-use", color: "from-purple-500 to-indigo-500" },
    { icon: <Phone size={28} />, sub: "\u12a0\u130d\u1299\u1295", label: "Contact Us", href: "/customer/contact-us", color: "from-rose-500 to-pink-500" },
  ];

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-between bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-950 dark:via-gray-900 dark:to-black text-gray-900 dark:text-gray-100 p-6 sm:p-10 overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-gradient-to-tr from-orange-400/40 to-yellow-400/30 rounded-full blur-3xl"
          animate={{ x: [0, 30, -20, 0], y: [0, 20, -25, 0] }}
          transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-gradient-to-bl from-amber-400/30 to-orange-300/20 rounded-full blur-3xl"
          animate={{ x: [0, -40, 30, 0], y: [0, -25, 20, 0] }}
          transition={{ repeat: Infinity, duration: 22, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.header
        className="relative z-10 text-center mt-10 mb-14"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {user?.name && (
          <motion.div
            className="inline-flex items-center gap-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-full px-4 py-2 border border-orange-200 dark:border-orange-800 shadow-sm mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <User size={16} className="text-orange-600 dark:text-orange-400" />
            <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
              \u12a5\u1295\u12b3\u1295 \u12f0\u1205\u1293 \u1218\u1321\u1363 {user.name}
            </span>
          </motion.div>
        )}

        <motion.h1
          className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-400 drop-shadow-lg mb-3"
          animate={{ backgroundPositionX: ["0%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          \u1245\u12f5\u121a\u12eb \ud83c\udf74 FoodCampus
        </motion.h1>

        <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">
          \u1260\u134d\u1325\u1290\u1275 \u12a5\u1293 \u1240\u120b\u120d \u121d\u130d\u1265 \u12eb\u12d8\u12d9\u1362
        </p>
      </motion.header>

      <motion.section
        className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 w-full max-w-6xl"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
      >
  {menu.map((item) => (
          <motion.div
            key={item.href}
            variants={{
              hidden: { opacity: 0, y: 40, scale: 0.9 },
              show: { opacity: 1, y: 0, scale: 1 },
            }}
            whileHover={{ scale: 1.08, y: -6 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Link
              href={item.href}
              className="group block bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl border border-white/40 dark:border-gray-700/40 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-3 p-6 text-center"
            >
              <div
                className={`p-3 rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}
              >
                {item.icon}
              </div>
              <span className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                {item.label}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {item.sub}
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.section>

      <motion.footer
        className="relative z-10 mt-14 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/20 dark:border-gray-700/20 shadow-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            Made with <span className="text-red-500 animate-pulse">\u2764\ufe0f</span> by{" "}
            <span className="font-bold text-orange-600 dark:text-orange-400">
              \u1245\u12f5\u121a\u12eb Teams
            </span>{" "}
            \u2022 University of Gondar \u2022 2025
          </p>
        </div>
      </motion.footer>
    </main>
  );
}

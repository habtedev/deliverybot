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
import UnauthorizedPage from "../unauthorized/page";

type UserType = { name?: string; phone?: string; role?: string } | null;

export default function CustomerClient({ user }: { user: UserType }) {
  if (!user) return <UnauthorizedPage />;

  const menu = [
    {
      icon: <UtensilsCrossed size={28} />,
      sub: "አድርጉ አድናቆት",
      label: "Order Now",
      href: "/customer/order",
      color: "from-orange-500 to-amber-500",
    },
    {
      icon: <Package size={28} />,
      sub: "የእኔ ትዕዛዞች",
      label: "My Orders",
      href: "/customer/my-orders",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Wallet size={28} />,
      sub: "ባለሙያ ተመን",
      label: "Wallet",
      href: "/customer/wallet",
      color: "from-emerald-500 to-green-500",
    },
    {
      icon: <Info size={28} />,
      sub: "መጠቀም መንገድ",
      label: "How to Use",
      href: "/customer/how-to-use",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: <Phone size={28} />,
      sub: "እኛን ያነጋግሩ",
      label: "Contact Us",
      href: "/customer/contact-us",
      color: "from-rose-500 to-pink-500",
    },
  ];

  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-between
      bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50
      dark:from-gray-950 dark:via-gray-900 dark:to-black
      text-gray-900 dark:text-gray-100 p-6 sm:p-10 overflow-hidden
      selection:bg-amber-200/70 selection:text-black"
    >
      {/* 🌈 Floating Animated Background */}
      <motion.div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute -top-24 -left-20 w-96 h-96 bg-gradient-to-tr from-orange-400/40 to-yellow-300/30 rounded-full blur-3xl"
          animate={{ x: [0, 30, -20, 0], y: [0, 20, -25, 0] }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[-10%] w-[28rem] h-[28rem] bg-gradient-to-bl from-amber-400/30 to-orange-300/20 rounded-full blur-3xl"
          animate={{ x: [0, -40, 30, 0], y: [0, -25, 20, 0] }}
          transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
        />
      </motion.div>

      {/* 🧑 HEADER */}
      <motion.header
        className="relative z-10 text-center mt-10 mb-12 flex flex-col items-center"
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* 🌟 Animated Glow Behind Logo */}
        <motion.div
          className="absolute -z-10 w-64 h-64 bg-gradient-to-r from-orange-400/30 via-amber-300/20 to-yellow-400/30 
            rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.5, 0.8, 0.5],
            rotate: [0, 20, -20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* 🍴 Animated Logo Title */}
        <motion.div
          className="relative inline-block px-10 py-4 rounded-3xl backdrop-blur-xl border border-orange-200/50 
          bg-gradient-to-r from-orange-100/80 to-amber-50/60 dark:from-gray-800/60 dark:to-gray-900/60 
          shadow-lg"
          animate={{
            y: [0, -6, 0],
            boxShadow: [
              "0 0 20px rgba(255, 165, 0, 0.3)",
              "0 0 35px rgba(255, 140, 0, 0.5)",
              "0 0 20px rgba(255, 165, 0, 0.3)",
            ],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.h1
            className="text-6xl sm:text-7xl font-extrabold text-transparent bg-clip-text 
            bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-400 
            drop-shadow-xl tracking-tight"
            animate={{
              backgroundPositionX: ["0%", "100%"],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          >
            🍴 ቅድሚያ
          </motion.h1>
        </motion.div>

        {/* 👤 Welcome Bubble */}
        <motion.div
          className="mt-5 inline-flex items-center gap-2 bg-white/90 dark:bg-gray-800/80 
          backdrop-blur-lg rounded-full px-6 py-2 border border-orange-200/70 
          dark:border-orange-700/60 shadow-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <User size={18} className="text-orange-600 dark:text-orange-400" />
          <span className="text-sm font-semibold text-orange-700 dark:text-orange-300">
            እንኳን ደህና መጡ፣ {user.name}
          </span>
        </motion.div>

        {/* 🍔 Tagline Text */}
        <motion.p
          className="text-gray-700 dark:text-gray-300 text-lg font-medium mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          Your favorite meals, served smartly 🍔
        </motion.p>
      </motion.header>

      {/* 🧭 MENU SECTION */}
      <motion.section
        className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 w-full max-w-6xl"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.12 } },
        }}
      >
        {menu.map((item) => (
          <motion.div
            key={item.href}
            variants={{
              hidden: { opacity: 0, y: 40, scale: 0.9 },
              show: { opacity: 1, y: 0, scale: 1 },
            }}
            whileHover={{
              scale: 1.1,
              rotate: [0, 1, -1, 0],
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          >
            <Link
              href={item.href}
              className="group relative block bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg 
              rounded-3xl border border-white/40 dark:border-gray-700/40 shadow-md 
              hover:shadow-2xl transition-all duration-500 flex flex-col items-center 
              gap-3 p-6 text-center hover:-translate-y-2"
            >
              <motion.div
                className={`p-4 rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}
                animate={{
                  boxShadow: [
                    "0 0 10px rgba(255,165,0,0.2)",
                    "0 0 20px rgba(255,165,0,0.3)",
                    "0 0 10px rgba(255,165,0,0.2)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {item.icon}
              </motion.div>
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

      {/* 🌍 FOOTER */}
      <motion.footer
        className="relative z-10 mt-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/20 dark:border-gray-700/20 shadow-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            Made with ❤️ by{" "}
            <span className="font-bold text-orange-600 dark:text-orange-400">
              ቅድሚያ ቡድን
            </span>{" "}
            • University of Gondar •{" "}
            <span className="font-semibold">2025</span>
          </p>
        </div>
      </motion.footer>
    </main>
  );
}

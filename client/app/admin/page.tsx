"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import UnauthorizedPage from '../unauthorized/page';

function safeDecode(token?: string) {
  if (!token) return null;
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export default function AdminDashboard() {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [user, setUser] = useState<{ name?: string; role?: string; phone?: string } | null>(null);

  useEffect(() => {
    const token = Cookies.get('auth_token');
    if (!token) {
      setAuthorized(false);
      return;
    }
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const decoded = JSON.parse(jsonPayload);
      setUser(decoded);
      setAuthorized(true);
    } catch (err) {
      console.error('Failed to decode token:', err);
      setAuthorized(false);
    }
  }, []);

  if (authorized === null) return <div>Loading...</div>;
  if (!authorized) return <UnauthorizedPage />;

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

      <p className="mb-4 text-gray-700">Welcome, <span className="font-semibold">{user?.name || 'Admin'}</span></p>

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

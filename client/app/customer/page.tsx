"use client";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function safeDecode(token?: string) {
  if (!token) return null;
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export default function CustomerPage() {
  const searchParams = useSearchParams();
  const [user, setUser] = useState<{ name?: string } | null>(null);

  useEffect(() => {
    const token = searchParams.get('token') || undefined;
    const decoded = safeDecode(token);
    setUser(decoded);
  }, [searchParams]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center bg-orange-50"
    >
      <h1 className="text-3xl font-bold text-orange-600 mb-4">🍔 Welcome, {user?.name || 'Student'}</h1>
      <p className="text-gray-700">Your current balance: <span className="font-semibold">$0.00</span></p>
    </motion.div>
  );
}

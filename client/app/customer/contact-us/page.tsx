"use client";
import { motion } from "framer-motion";

export default function ContactUs() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex flex-col items-center justify-center bg-orange-50"
    >
      <h1 className="text-3xl font-bold text-orange-600 mb-4">☎️ Contact Us</h1>
      <p className="text-gray-700 text-center">
        📧 Email: support@foodcampus.com  
        📞 Phone: +251 900 000 000
      </p>
    </motion.div>
  );
}

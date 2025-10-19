"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, Share2, ArrowLeftRight, Plus, X } from "lucide-react";
import Link from "next/link";

export default function WalletPage() {
  const [balance, setBalance] = useState(120.5);

  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showAddFunds, setShowAddFunds] = useState(false);

  const [method, setMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [userId, setUserId] = useState("");
  const [success, setSuccess] = useState(false);

  const handleAddFunds = () => {
    if (Number(amount) >= 1) {
      setBalance((prev) => prev + Number(amount));
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setShowAddFunds(false);
        setAmount("");
      }, 2000);
    } else {
      alert("Please enter at least 1 birr.");
    }
  };

  const handleWithdraw = () => {
    if (Number(amount) >= 1 && method) {
      if (Number(amount) > balance) {
        alert("Insufficient balance!");
        return;
      }
      setBalance((prev) => prev - Number(amount));
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setShowWithdraw(false);
        setAmount("");
        setMethod("");
      }, 2000);
    } else {
      alert("Select a method and enter at least 1 birr.");
    }
  };

  const handleTransfer = () => {
    if (userId) {
      alert(`💸 Sent to User ID: ${userId}`);
      setShowTransfer(false);
      setUserId("");
    } else {
      alert("Please enter a User ID");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-amber-100 p-6 text-center relative">
      <motion.h2
        className="text-3xl font-extrabold text-orange-700 mb-6 flex items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Wallet className="text-orange-600" /> Wallet
      </motion.h2>

      {/* Balance Display */}
      <motion.div
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm mb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <p className="text-gray-500 text-sm">Current Balance</p>
        <h1 className="text-4xl font-bold text-orange-700 mt-1 mb-4">
          {balance.toFixed(2)} ብር
        </h1>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setShowAddFunds(true)}
            className="px-5 py-2 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 transition flex items-center gap-1"
          >
            <Plus size={18} /> Add Funds
          </button>
          <button
            onClick={() => setShowWithdraw(true)}
            className="px-5 py-2 rounded-full bg-orange-600 text-white font-semibold hover:bg-orange-700 transition"
          >
            Withdraw
          </button>
          <button
            onClick={() => setShowTransfer(true)}
            className="px-5 py-2 rounded-full bg-amber-500 text-white font-semibold hover:bg-amber-600 transition"
          >
            Transfer
          </button>
          <button
            onClick={() => setShowShare(true)}
            className="px-5 py-2 rounded-full bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition"
          >
            Share
          </button>
        </div>
      </motion.div>

      <Link
        href="/customer"
        className="mt-4 text-orange-600 hover:text-orange-800 font-medium"
      >
        ⬅ Back to Customer Page
      </Link>

      {/* Add Funds Popup */}
      <AnimatePresence>
        {showAddFunds && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-6 w-80 text-left relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                onClick={() => setShowAddFunds(false)}
              >
                <X size={20} />
              </button>
              <h3 className="text-lg font-bold text-green-600 mb-4 flex items-center gap-2">
                <Plus className="text-green-500" /> Add Funds
              </h3>

              <input
                type="number"
                placeholder="Enter amount (min 1 birr)"
                className="w-full border rounded-lg p-2 mb-4 outline-none focus:ring-2 focus:ring-green-400"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <button
                onClick={handleAddFunds}
                className="w-full bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition"
              >
                Add
              </button>

              {success && (
                <p className="text-green-600 font-semibold mt-3 text-center">
                  ✅ Funds Added Successfully!
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Withdraw Popup */}
      <AnimatePresence>
        {showWithdraw && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-6 w-80 text-left relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                onClick={() => setShowWithdraw(false)}
              >
                <X size={20} />
              </button>
              <h3 className="text-lg font-bold text-orange-700 mb-4">
                Withdraw Funds
              </h3>

              {/* Radio Buttons */}
              <div className="space-y-3 mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="method"
                    value="telebirr"
                    checked={method === "telebirr"}
                    onChange={(e) => setMethod(e.target.value)}
                  />
                  Telebirr — <span className="text-gray-600">0945870700 (Habtamu)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="method"
                    value="cbe"
                    checked={method === "cbe"}
                    onChange={(e) => setMethod(e.target.value)}
                  />
                  CBE — <span className="text-gray-600">1000 37810100 (Habtamu)</span>
                </label>
              </div>

              <input
                type="number"
                placeholder="Enter amount (min 1 birr)"
                className="w-full border rounded-lg p-2 mb-4 outline-none focus:ring-2 focus:ring-orange-400"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <button
                onClick={handleWithdraw}
                className="w-full bg-orange-600 text-white font-semibold py-2 rounded-lg hover:bg-orange-700 transition"
              >
                Submit
              </button>

              {success && (
                <p className="text-green-600 font-semibold mt-3 text-center">
                  ✅ Withdrawal Successful!
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transfer Popup */}
      <AnimatePresence>
        {showTransfer && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-6 w-80 text-left relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                onClick={() => setShowTransfer(false)}
              >
                <X size={20} />
              </button>
              <h3 className="text-lg font-bold text-orange-700 mb-4 flex items-center gap-2">
                <ArrowLeftRight className="text-orange-600" /> Transfer
              </h3>
              <input
                type="text"
                placeholder="Enter User ID"
                className="w-full border rounded-lg p-2 mb-4 outline-none focus:ring-2 focus:ring-amber-400"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
              <button
                onClick={handleTransfer}
                className="w-full bg-amber-500 text-white font-semibold py-2 rounded-lg hover:bg-amber-600 transition"
              >
                Send
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Popup */}
      <AnimatePresence>
        {showShare && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-6 w-80 text-left relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                onClick={() => setShowShare(false)}
              >
                <X size={20} />
              </button>
              <h3 className="text-lg font-bold text-emerald-600 mb-4 flex items-center gap-2">
                <Share2 className="text-emerald-500" /> Share Screenshot
              </h3>

              <input
                type="file"
                accept="image/*"
                className="w-full border p-2 rounded-lg mb-4"
              />
              <button
                className="w-full bg-emerald-500 text-white font-semibold py-2 rounded-lg hover:bg-emerald-600 transition"
              >
                Upload & Share
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

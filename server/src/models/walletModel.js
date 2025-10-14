import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  balance: { type: Number, default: 0 },
  transactions: [
    {
      amount: Number,
      type: { type: String, enum: ["credit", "debit"] },
      date: { type: Date, default: Date.now },
      description: String,
    },
  ],
}, { timestamps: true });

const Wallet = mongoose.model("Wallet", walletSchema);
export default Wallet;

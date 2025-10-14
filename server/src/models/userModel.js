import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  telegramId: { type: String, unique: true, sparse: true },
  name: { type: String },
  phone: { type: String, required: true, unique: true },
  role: { type: String, enum: ["customer", "admin"], default: "customer" },
  wallet: { type: Number, default: 0 },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;

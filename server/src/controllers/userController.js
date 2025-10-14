import User from "../models/userModel.js";

export async function registerUser(req, res) {
  const { name, phone, password } = req.body;
  if (!name || !phone || !password) {
    return res.status(400).json({ error: "All fields required" });
  }
  let user = await User.findOne({ phone });
  if (user) {
    return res.status(409).json({ error: "User already exists" });
  }
  user = await User.create({ name, phone, password });
  res.status(201).json({ success: true, user: { name: user.name, phone: user.phone } });
}

export async function loginUser(req, res) {
  const { phone, password } = req.body;
  if (!phone || !password) {
    return res.status(400).json({ error: "Phone and password required" });
  }
  const user = await User.findOne({ phone });
  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  res.json({ success: true, user: { name: user.name, phone: user.phone, role: user.role } });
}

import express from "express";
import Order from "../models/orderModel.js";
const router = express.Router();

// Get all orders
router.get("/", async (req, res) => {
  const orders = await Order.find().populate("user");
  res.json(orders);
});

// Get order by ID
router.get("/:id", async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user");
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
});

export default router;

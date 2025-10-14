import Order from "../models/orderModel.js";

// Example: get all orders
export async function getAllOrders(req, res) {
  const orders = await Order.find().populate("user");
  res.json(orders);
}

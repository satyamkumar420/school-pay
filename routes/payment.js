// 🚀 Import required modules
import express from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js";
import Order from "../models/Order.js";
import OrderStatus from "../models/OrderStatus.js";
import WebhookLog from "../models/WebhookLog.js";
import { v4 as uuidv4 } from "uuid";
import { paymentRules, validate } from "../validators/paymentValidator.js";

// ⚙️ Initialize Express router
const router = express.Router();

// @route   POST api/payment/create-payment
// @desc    Create a new payment request
// @access  Private
router.post(
  "/create-payment",
  auth,
  paymentRules(),
  validate,
  async (req, res) => {
    // 📝 Destructure request body
    const { amount, student_info } = req.body;

    // 🔍 Validate input
    if (!amount || !student_info) {
      return res
        .status(400)
        .json({ message: "Please provide amount and student_info" });
    }

    try {
      // ✨ Create JWT payload for payment gateway
      const payload = {
        school_id: process.env.SCHOOL_ID,
        amount,
        callback_url: process.env.CALLBACK_URL,
      };

      // ✍️ Sign the JWT
      const sign = jwt.sign(payload, process.env.PG_KEY);

      // 📞 Make API call to payment gateway
      console.log("PG_KEY:", process.env.PG_KEY);
      const response = await axios.post(
        "https://dev-vanilla.edviron.com/erp/create-collect-request",
        {
          school_id: process.env.SCHOOL_ID,
          amount,
          callback_url: process.env.CALLBACK_URL,
          sign,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYMENT_API_KEY}`,
          },
        }
      );

      // 💾 Create a new order in the database
      const newOrder = new Order({
        school_id: process.env.SCHOOL_ID,
        trustee_id: req.user.id,
        student_info: student_info,
        gateway_name: "PhonePe", // Assuming PhonePe as per docs
        amount: amount,
        custom_order_id: uuidv4(),
        collect_request_id: response.data.collect_request_id, // 🔗 Link to the payment gateway request
      });
      await newOrder.save();

      // 📊 Create an initial order status
      const newOrderStatus = new OrderStatus({
        collect_id: newOrder._id, // 🔗 Link to the Order document
        order_amount: amount,
        transaction_amount: 0,
        payment_mode: "",
        payment_details: "",
        bank_reference: "",
        payment_message: "",
        status: "pending",
        error_message: "",
        payment_time: new Date(),
      });
      await newOrderStatus.save();

      // 🚀 Send the payment URL to the frontend
      console.log(
        "Sending URL to frontend:",
        response.data.collect_request_url
      );
      res.json({
        collect_request_url: response.data.collect_request_url,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   POST api/payment/webhook
// @desc    Handle payment status updates
// @access  Public
router.post("/webhook", async (req, res) => {
  try {
    const payload = req.body;
    console.log("Webhook payload:", payload);

    // 🪵 Log the entire payload for debugging
    const webhookLog = new WebhookLog({
      source: "payment-gateway",
      payload,
    });
    await webhookLog.save();

    // 🔄 Update order status
    const { order_info } = payload;
    if (order_info && order_info.order_id) {
      // 📦 Find the order by collect_request_id
      const order = await Order.findOne({
        collect_request_id: order_info.order_id,
      });

      if (order) {
        await OrderStatus.findOneAndUpdate(
          { collect_id: order._id }, // 🔗 Find by the Order document's _id
          {
            order_amount: order_info.order_amount,
            transaction_amount: order_info.transaction_amount,
            payment_mode: order_info.payment_mode,
            payment_details:
              order_info.payemnt_details || order_info.payment_details,
            bank_reference: order_info.bank_reference,
            payment_message:
              order_info.Payment_message || order_info.payment_message,
            status: order_info.status,
            error_message: order_info.error_message,
            payment_time: order_info.payment_time,
          },
          { new: true, upsert: true } //  upsert: true will create a new doc if one doesn't exist
        );
      }
    }

    // ✅ Acknowledge receipt
    res.status(200).send("OK");
  } catch (err) {
    console.error("Webhook Error:", err.message);
    res.status(500).send("Server Error");
  }
});

export default router;

// 🚀 Import required modules
import express from "express";
import mongoose from "mongoose";
import auth from "../middleware/auth.js";
import OrderStatus from "../models/OrderStatus.js";
import Order from "../models/Order.js";

// ⚙️ Initialize Express router
const router = express.Router();

// @route   GET api/transactions
// @desc    Get all transactions with pagination and sorting
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    // 📄 Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // 🔃 Sorting parameters
    const sort = req.query.sort || "payment_time";
    const order = req.query.order === "asc" ? 1 : -1;
    const sortOrder = { [sort]: order };

    // 🔗 Aggregation pipeline
    const transactions = await OrderStatus.aggregate([
      {
        $lookup: {
          from: "orders",
          localField: "collect_id",
          foreignField: "_id",
          as: "orderDetails",
        },
      },
      {
        $unwind: "$orderDetails",
      },
      {
        $project: {
          _id: 0,
          collect_id: 1,
          school_id: "$orderDetails.school_id",
          gateway: "$orderDetails.gateway_name",
          order_amount: 1,
          transaction_amount: 1,
          status: 1,
          student_info: "$orderDetails.student_info",
          custom_order_id: "$orderDetails.custom_order_id",
        },
      },
      {
        $sort: sortOrder,
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

    // 📊 Get total count for pagination
    const totalTransactions = await OrderStatus.countDocuments();

    // ↪️ Send response
    res.json({
      total: totalTransactions,
      page,
      limit,
      totalPages: Math.ceil(totalTransactions / limit),
      data: transactions,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/transactions/school/:schoolId
// @desc    Get all transactions for a specific school with pagination and sorting
// @access  Private
router.get("/school/:schoolId", auth, async (req, res) => {
  try {
    // 🏫 School ID from parameters
    const { schoolId } = req.params;

    // 📄 Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // 🔃 Sorting parameters
    const sort = req.query.sort || "payment_time";
    const order = req.query.order === "asc" ? 1 : -1;
    const sortOrder = { [sort]: order };

    // 🔗 Aggregation pipeline
    const pipeline = [
      {
        $lookup: {
          from: "orders",
          localField: "collect_id",
          foreignField: "_id",
          as: "orderDetails",
        },
      },
      {
        $unwind: "$orderDetails",
      },
      {
        $match: {
          "orderDetails.school_id": schoolId,
        },
      },
      {
        $project: {
          _id: 0,
          collect_id: 1,
          school_id: "$orderDetails.school_id",
          gateway: "$orderDetails.gateway_name",
          order_amount: 1,
          transaction_amount: 1,
          status: 1,
          student_info: "$orderDetails.student_info",
          custom_order_id: "$orderDetails.custom_order_id",
        },
      },
      {
        $sort: sortOrder,
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ];

    const transactions = await OrderStatus.aggregate(pipeline);

    // 📊 Get total count for pagination
    const totalTransactions = await OrderStatus.aggregate([
      ...pipeline.slice(0, 3), // Use the pipeline up to the $match stage
      { $count: "total" },
    ]);

    const count = totalTransactions.length > 0 ? totalTransactions[0].total : 0;

    // ↪️ Send response
    res.json({
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
      data: transactions,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// @route   GET /api/transaction-status/:custom_order_id
// @desc    Get transaction status by custom_order_id
// @access  Private
router.get("/transaction-status/:custom_order_id", auth, async (req, res) => {
  try {
    // 📦 Find the order by custom_order_id
    const order = await Order.findOne({
      custom_order_id: req.params.custom_order_id,
    });

    // 🚫 If no order, return 404
    if (!order) {
      return res.status(404).json({ msg: "Transaction not found" });
    }

    // 🔗 Find the corresponding order status using the collect_id
    const orderStatus = await OrderStatus.findOne({
      collect_id: order.razorpayOrderId,
    });

    // 🚫 If no status, return 404
    if (!orderStatus) {
      return res.status(404).json({ msg: "Transaction status not found" });
    }

    // ✅ Return the status
    res.json({ status: orderStatus.status });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default router;

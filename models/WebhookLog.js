import mongoose from "mongoose";

const WebhookLogSchema = new mongoose.Schema({
  status: {
    type: Number,
  },
  order_info: {
    order_id: { type: String },
    order_amount: { type: Number },
    transaction_amount: { type: Number },
    gateway: { type: String },
    bank_reference: { type: String },
    status: { type: String },
    payment_mode: { type: String },
    payment_details: { type: String },
    Payment_message: { type: String },
    payment_time: { type: Date },
    error_message: { type: String },
  },
  receivedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("WebhookLog", WebhookLogSchema);

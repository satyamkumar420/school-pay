import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  school_id: {
    type: String, // Object_id /string as per docs
    required: true,
  },
  trustee_id: {
    type: String, // Object_id /string as per docs
    required: true,
  },
  student_info: {
    name: { type: String, required: true },
    id: { type: String, required: true },
    email: { type: String, required: true },
  },
  gateway_name: {
    type: String,
    required: true,
  },
  collect_request_id: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Order", OrderSchema);

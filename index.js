// 🚀 Import required modules
import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import paymentRoutes from "./routes/payment.js";
import transactionRoutes from "./routes/transaction.js";
import errorHandler from "./middleware/errorHandler.js";

// Connect Database.
connectDB();

// ⚙️ Initialize Express app
const app = express();

// Enable CORS 🤝
app.use(cors());

// Init Middleware
app.use(express.json({ extended: false }));

// 🌐 Define the port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// 🏠 Default route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Define Routes
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/transactions", transactionRoutes);

// 💣 Use the centralized error handler
app.use(errorHandler);

// 👂 Start the server only if this file is run directly (not imported)
if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// 🚀 Export the app for testing
export default app;

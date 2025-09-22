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
app.use(
  cors({
    origin: "*", // 🌐 Allow all origins
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // 🛠️ Allow all methods
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// Init Middleware
app.use(express.json({ extended: false }));

// 🌐 Define the port
const PORT = process.env.PORT || 3000;

// 🏠 Default route
app.get("/", (req, res) => {
  const now = new Date();
  const timestamp = now.toUTCString();

  // 🎨 Styled HTML response
  const htmlResponse = `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #f0f2f5;">
      <h1 style="color: #333;">🚀 API is up and running!</h1>
      <p style="color: #555; font-size: 1.2em;">Welcome to the API.</p>
      <div style="margin-top: 30px; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
        <p style="color: #333; margin: 0;"><strong>Server Status:</strong> <span style="color: #28a745;">✅ Online</span></p>
        <p style="color: #333; margin: 10px 0 0;"><strong>Timestamp:</strong> ${timestamp}</p>
      </div>
    </div>
  `;
  res.send(htmlResponse);
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

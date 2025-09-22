// 🚀 Require Mongoose to interact with MongoDB
import mongoose from "mongoose";

// 🎯 Define an async function to connect to the database
const connectDB = async () => {
  try {
    // ✨ Attempt to connect to MongoDB using the URI from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI, {});

    // ✅ Log a success message with the connection host
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // ❌ Log any errors that occur during connection and exit the process
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// 📦 Export the connectDB function to be used in other parts of the application
export default connectDB;

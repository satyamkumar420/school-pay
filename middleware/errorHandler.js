//  centralized-error-handler.js

//  centralized-error-handler.js

export default function errorHandler(err, req, res, next) {
  // 📝 Log the error for debugging purposes
  console.error(err);

  // 🚦 Check for specific error types and respond accordingly
  if (err.name === "ValidationError") {
    // Mongoose validation error
    return res.status(422).json({
      error: "Validation failed",
      details: err.errors,
    });
  }

  if (err.name === "CastError") {
    // Mongoose invalid ObjectId error
    return res.status(400).json({
      error: "Invalid ID format",
      message: `The provided ID '${err.value}' is not a valid ObjectId.`,
    });
  }

  if (err.name === "JsonWebTokenError") {
    // JWT authentication error
    return res.status(401).json({
      error: "Authentication failed",
      message: "Invalid or expired token. Please log in again.",
    });
  }

  if (err.code === 11000) {
    // MongoDB duplicate key error
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      error: "Duplicate key error",
      message: `An account with that ${field} already exists.`,
    });
  }

  // 💣 Default to a 500 internal server error
  res.status(err.status || 500).json({
    error: "Internal Server Error",
    message: "Something went wrong on our end. Please try again later.",
  });
}

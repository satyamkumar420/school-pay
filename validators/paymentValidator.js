import { body, validationResult } from "express-validator";

// 🎯 Middleware to handle validation results
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// 💳 Add payment validation rules here in the future
export const paymentRules = () => [
  // Example: body('amount', 'Amount is required').not().isEmpty(),
];

import { body, validationResult } from "express-validator";

// 🎯 Middleware to handle validation results
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// 🔐 Validation rules for user registration
export const registerRules = () => [
  body("email", "Please include a valid email").isEmail(),
  body("password", "Password must be 6 or more characters").isLength({
    min: 6,
  }),
];

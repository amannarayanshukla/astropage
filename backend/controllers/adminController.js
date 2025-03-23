const User = require("../models/User");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.adminLogin = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  // Validate admin
  const admin = await User.findOne({ username }).select("+password");

  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Create JWT token
  const token = jwt.sign(
    { id: admin._id, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );

  res.status(200).json({
    success: true,
    token,
  });
});

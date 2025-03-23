const express = require("express");
const router = express.Router();

// Import route files
const adminRoutes = require("./admin");
const sessionRoutes = require("./sessions");
const eventRoutes = require("./events");
const productRoutes = require("./products");
const reviewRoutes = require("./reviews");
const socialRoutes = require("./social");
// const bookingRoutes = require('./bookings');

// Basic health check route
router.get("/health-check", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});

// routes
router.use("/admin", adminRoutes);
router.use("/social", socialRoutes);
router.use("/sessions", sessionRoutes);
router.use("/events", eventRoutes);
router.use("/products", productRoutes);
router.use("/reviews", reviewRoutes);

// Booking routes (to be added later)
// router.use('/bookings', bookingRoutes);

// Fallback route for undefined endpoints
router.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

module.exports = router;

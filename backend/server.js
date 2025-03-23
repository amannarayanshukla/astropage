require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");
const swaggerDocs = require("./config/swagger");
const errorHandler = require("./middleware/errorHandler");
const app = express();

// Database connection
connectDB();

const seedAdmin = require("./config/seedAdmin");
seedAdmin();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api", require("./routes"));

// Swagger Documentation
swaggerDocs(app);

// Error Handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

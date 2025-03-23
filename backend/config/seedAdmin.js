const User = require("../models/User");
const dotenv = require("dotenv");
dotenv.config();

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({
      username: process.env.ADMIN_USERNAME,
    });

    if (!adminExists) {
      await User.create({
        username: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD,
      });
      console.log("Admin user created successfully");
    }
  } catch (err) {
    console.error("Error seeding admin:", err.message);
  }
};

module.exports = seedAdmin;

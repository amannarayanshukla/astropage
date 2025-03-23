const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const SocialConfig = require("../models/SocialConfig");
const adminController = require("../controllers/adminController");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

/**
 * @swagger
 * components:
 *   schemas:
 *     AdminLogin:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           example: "admin"
 *         password:
 *           type: string
 *           example: "admin"
 *     AuthToken:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         token:
 *           type: string
 *       example:
 *         success: true
 *         token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2M..."
 */

/**
 * @swagger
 * /admin/login:
 *   post:
 *     tags: [Admin]
 *     summary: Admin login
 *     description: Authenticate admin user and get JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminLogin'
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthToken'
 *             example:
 *               success: true
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: "Username and password are required"
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: "Invalid credentials"
 */

router.post(
  "/login",
  [
    check("username", "Username is required").not().isEmpty(),
    check("password", "Password is required").exists(),
  ],
  adminController.adminLogin
);

/**
 * @swagger
 * /admin/social-config:
 *   post:
 *     tags: [Admin]
 *     summary: Set social media configuration
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               beholdUrl:
 *                 type: string
 *                 example: "https://feeds.behold.so/BmSqpTu4JjBPiCWhewwS"
 *               calendlyUrl:
 *                 type: string
 *               youtubeApiKey:
 *                 type: string
 *               youtubeChannelId:
 *                 type: string
 *               youtubePlaylistId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Configuration saved
 */

router.post("/social-config", [auth, isAdmin], async (req, res) => {
  const config = await SocialConfig.findOneAndUpdate(
    {},
    {
      ...req.body,
      lastUpdated: new Date(),
    },
    { upsert: true, new: true }
  );
  res.json({ success: true, data: config });
});

/**
 * @swagger
 * /admin/social-config:
 *   get:
 *     tags: [Admin]
 *     summary: Get current social config
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current configuration
 */

router.get("/social-config", [auth, isAdmin], async (req, res) => {
  const config = await SocialConfig.findOne();
  res.json({ success: true, data: config });
});

module.exports = router;

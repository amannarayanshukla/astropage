const express = require("express");
const router = express.Router();
const socialController = require("../controllers/socialController");

/**
 * @swagger
 * /social/feed:
 *   get:
 *     tags: [Social]
 *     summary: Get combined social feed
 *     responses:
 *       200:
 *         description: Social media feed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 instagram:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       image:
 *                         type: string
 *                       caption:
 *                         type: string
 *                       timestamp:
 *                         type: string
 *                       url:
 *                         type: string
 *                 youtube:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       thumbnail:
 *                         type: string
 *                       publishedAt:
 *                         type: string
 *                       url:
 *                         type: string
 */
router.get("/feed", socialController.getSocialFeed);

module.exports = router;

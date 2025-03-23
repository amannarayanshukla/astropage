const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { upload } = require("../utils/fileUpload");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const reviewController = require("../controllers/reviewController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - rating
 *         - description
 *         - userName
 *         - company
 *         - designation
 *       properties:
 *         rating:
 *           type: number
 *         description:
 *           type: string
 *         userName:
 *           type: string
 *         image:
 *           type: string
 *           example: "uploads/user-avatar.jpg"
 *         company:
 *           type: string
 *         designation:
 *           type: string
 *         logo:
 *           type: string
 *           example: "uploads/company-logo.png"
 */

/**
 * @swagger
 * /reviews:
 *   get:
 *     tags: [Reviews]
 *     summary: Get all Reviews
 *     responses:
 *       200:
 *         description: List of Reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Review'
 *
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags: [Reviews]
 *     summary: Create new Review
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *               description:
 *                 type: string
 *               userName:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               company:
 *                 type: string
 *               designation:
 *                 type: string
 *               logo:
 *                 type: string
 *                 format: binary
 *             required:
 *               - rating
 *               - description
 *               - userName
 *               - company
 *               - designation
 *     responses:
 *       201:
 *         description: Review created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 */

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     tags: [Reviews]
 *     summary: Get Review by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review details
 *       404:
 *         description: Review not found
 *
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags: [Reviews]
 *     summary: Update Review
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: Updated Review
 *       404:
 *         description: Review not found
 *
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags: [Reviews]
 *     summary: Delete Review
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review deleted
 *       404:
 *         description: Review not found
 */

// Public routes
router.get("/", reviewController.getAllReviews);
router.get("/:id", reviewController.getReviewById);

// Admin routes
router.post(
  "/",
  [
    auth,
    isAdmin,
    upload.fields([
      { name: "image", maxCount: 1 },
      { name: "logo", maxCount: 1 },
    ]),
    check("rating", "Rating between 1-5 is required").isFloat({
      min: 1,
      max: 5,
    }),
    check("description", "Description is required").not().isEmpty(),
    check("userName", "User name is required").not().isEmpty(),
    check("company", "Company name is required").not().isEmpty(),
    check("designation", "Designation is required").not().isEmpty(),
  ],
  reviewController.createReview
);

router.put(
  "/:id",
  [
    auth,
    isAdmin,
    upload.fields([
      { name: "image", maxCount: 1 },
      { name: "logo", maxCount: 1 },
    ]),
    check("rating", "Rating between 1-5 is required")
      .optional()
      .isFloat({ min: 1, max: 5 }),
    check("description", "Description is required").optional().not().isEmpty(),
  ],
  reviewController.updateReview
);

router.delete("/:id", [auth, isAdmin], reviewController.deleteReview);

module.exports = router;

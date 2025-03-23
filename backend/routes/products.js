const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { upload } = require("../utils/fileUpload");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const productController = require("../controllers/productController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           example: "Astrology Chart Poster"
 *         description:
 *           type: string
 *           example: "High-quality printed natal chart"
 *         price:
 *           type: number
 *           format: float
 *           example: 29.99
 *         rating:
 *           type: number
 *           example: 4.5
 *         numberOfReviews:
 *           type: integer
 *           example: 12
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           example: ["poster1.jpg", "poster2.jpg"]
 *         variant:
 *           type: string
 *           enum: ["Option One", "Option Two", "Option Three"]
 *         _id:
 *           type: string
 *           example: 660f4d9b6d834a3d489f5c1a
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-04-05T12:00:00Z"
 */

/**
 * @swagger
 * /products:
 *   get:
 *     tags: [Products]
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: List of products
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
 *                     $ref: '#/components/schemas/Product'
 *
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags: [Products]
 *     summary: Create new product
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: images
 *         type: file
 *         description: Product images (max 5)
 *         required: false
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               variant:
 *                 type: array
 *                 items:
 *                   type: string
 *               rating:
 *                 type: number
 *               numberOfReviews:
 *                 type: integer
 *               details:
 *                 type: string
 *               shipping:
 *                 type: string
 *               returns:
 *                 type: string
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: "ValidationError: Description is required"
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     tags: [Products]
 *     summary: Get product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 *
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags: [Products]
 *     summary: Update product
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
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Updated product
 *       404:
 *         description: Product not found
 *
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags: [Products]
 *     summary: Delete product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 */

// Public routes
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

// Admin routes
router.post(
  "/",
  [
    auth,
    isAdmin,
    upload.array("images", 5),
    check("name", "Name is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("price", "Valid price is required").isFloat({ min: 0 }),
  ],
  productController.createProduct
);

router.put(
  "/:id",
  [
    auth,
    isAdmin,
    upload.array("images", 5),
    check("name", "Name is required").optional().not().isEmpty(),
    check("description", "Description is required").optional().not().isEmpty(),
    check("price", "Valid price required").optional().isFloat({ min: 0 }),
    check("rating", "Rating must be between 0-5")
      .optional()
      .isFloat({ min: 0, max: 5 }),
  ],
  productController.updateProduct
);

router.delete("/:id", [auth, isAdmin], productController.deleteProduct);

module.exports = router;

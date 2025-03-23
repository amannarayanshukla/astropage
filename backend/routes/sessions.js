const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { upload } = require("../utils/fileUpload");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const sessionController = require("../controllers/sessionController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Session:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: array
 *           items:
 *             type: string
 *         tagLines:
 *           type: array
 *           items:
 *             type: string
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           example: ["uploads/session1.jpg"]
 *         price:
 *           type: number
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * tags:
 *   name: Sessions
 *   description: Session management endpoints
 */

/**
 * @swagger
 * /sessions:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags: [Sessions]
 *     summary: Create new session
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: array
 *                 items:
 *                   type: string
 *               tagLines:
 *                 type: array
 *                 items:
 *                   type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               price:
 *                 type: number
 *             required:
 *               - title
 *               - description
 *     responses:
 *       201:
 *         description: Session created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Session'
 *
 *   get:
 *     summary: Get all sessions
 *     tags: [Sessions]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: List of all sessions
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
 *                     $ref: '#/components/schemas/Session'
 */

/**
 * @swagger
 * /sessions/{id}:
 *   get:
 *     summary: Get session by ID
 *     tags: [Sessions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Session data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Session'
 *       404:
 *         description: Session not found
 *
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update session
 *     tags: [Sessions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Session'
 *     responses:
 *       200:
 *         description: Updated session data
 *       400:
 *         description: Validation error
 *       404:
 *         description: Session not found
 *
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete session
 *     tags: [Sessions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Session deleted successfully
 *       404:
 *         description: Session not found
 */

// @route   POST /api/sessions
// @desc    Create new session
router.post(
  "/",
  [
    auth,
    isAdmin,
    upload.array("images", 3),
    check("title", "Title is required").not().isEmpty(),
    check("description", "Description is required").isArray({ min: 1 }),
  ],
  sessionController.createSession
);

// @route   GET /api/sessions
// @desc    Get all sessions
router.get("/", sessionController.getAllSessions);

// @route   GET /api/sessions/:id
// @desc    Get session by ID
router.get("/:id", sessionController.getSessionById);

// @route   PUT /api/sessions/:id
// @desc    Update session
router.put(
  "/:id",
  [
    auth,
    isAdmin,
    upload.array("images", 3),
    check("title", "Title is required").optional().not().isEmpty(),
    check("description", "Description must be array").optional().isArray(),
  ],
  sessionController.updateSession
);

// @route   DELETE /api/sessions/:id
// @desc    Delete session
router.delete("/:id", [auth, isAdmin], sessionController.deleteSession);

module.exports = router;

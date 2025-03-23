const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { upload } = require("../utils/fileUpload");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const eventController = require("../controllers/eventController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - eventDate
 *         - price
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
 *         image:
 *           type: string
 *           example: "uploads/event-image.jpg"
 *         eventDate:
 *           type: string
 *           format: date-time
 *         price:
 *           type: number
 */

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event management endpoints
 */

/**
 * @swagger
 * /events:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags: [Events]
 *     summary: Create new event
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
 *               image:
 *                 type: string
 *                 format: binary
 *               eventDate:
 *                 type: string
 *                 format: date-time
 *               price:
 *                 type: number
 *             required:
 *               - title
 *               - description
 *               - eventDate
 *               - price
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Validation error
 *
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *     responses:
 *       200:
 *         description: List of events
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
 *                     $ref: '#/components/schemas/Event'
 */

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found
 *
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update event
 *     tags: [Events]
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
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Updated event
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Event not found
 *
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event deleted
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data: {}
 *       404:
 *         description: Event not found
 */

// @desc    Get all events
// @route   GET /api/events
router.get("/", eventController.getAllEvents);

// @desc    Create event
// @route   POST /api/events
router.post(
  "/",
  [
    auth,
    isAdmin,
    upload.single("image"),
    check("title", "Title is required").not().isEmpty(),
    check("description", "Description is required").isArray({ min: 1 }),
    check("eventDate", "Valid event date is required").isISO8601(),
    check("price", "Valid price is required").isFloat({ min: 0 }),
  ],
  eventController.createEvent
);

// @desc    Get single event
// @route   GET /api/events/:id
router.get("/:id", eventController.getEventById);

// @desc    Update event
// @route   PUT /api/events/:id
router.put(
  "/:id",
  [
    auth,
    isAdmin,
    upload.single("image"),
    check("title", "Title is required").optional().not().isEmpty(),
    check("description", "Description must be array").optional().isArray(),
    check("eventDate", "Valid event date required").optional().isISO8601(),
    check("price", "Valid price required").optional().isFloat({ min: 0 }),
  ],
  eventController.updateEvent
);

// @desc    Delete event
// @route   DELETE /api/events/:id
router.delete("/:id", [auth, isAdmin], eventController.deleteEvent);

module.exports = router;

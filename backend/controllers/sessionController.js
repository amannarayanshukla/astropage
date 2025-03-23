const Session = require("../models/Session");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Create new session
// @route   POST /api/sessions
exports.createSession = asyncHandler(async (req, res, next) => {
  const { title, description, tagLines, price } = req.body;

  const images = req.files?.map((file) => `uploads/${file.filename}`) || [];

  // Create session
  const session = await Session.create({
    title,
    description,
    tagLines: tagLines || [],
    price,
    images,
  });

  res.status(201).json({
    success: true,
    data: session,
  });
});

// @desc    Get all sessions
// @route   GET /api/sessions
exports.getAllSessions = asyncHandler(async (req, res, next) => {
  const sessions = await Session.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: sessions.length,
    data: sessions,
  });
});

// @desc    Get session by ID
// @route   GET /api/sessions/:id
exports.getSessionById = asyncHandler(async (req, res, next) => {
  const session = await Session.findById(req.params.id);

  if (!session) {
    return next(
      new ErrorResponse(`Session not found with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: session,
  });
});

// @desc    Update session
// @route   PUT /api/sessions/:id
exports.updateSession = asyncHandler(async (req, res, next) => {
  const updates = { ...req.body };

  if (req.files?.length) {
    updates.images = req.files.map((file) => `uploads/${file.filename}`);
  }

  const session = await Session.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  });

  if (!session) {
    return next(
      new ErrorResponse(`Session not found with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: session,
  });
});

// @desc    Delete session
// @route   DELETE /api/sessions/:id
exports.deleteSession = asyncHandler(async (req, res, next) => {
  const session = await Session.findByIdAndDelete(req.params.id);

  if (!session) {
    return next(
      new ErrorResponse(`Session not found with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});

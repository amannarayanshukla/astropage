const Event = require("../models/Event");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get all events
exports.getAllEvents = asyncHandler(async (req, res) => {
  const events = await Event.find().sort({ eventDate: 1 });
  res.status(200).json({
    success: true,
    count: events.length,
    data: events,
  });
});

// @desc    Get single event
exports.getEventById = asyncHandler(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(
      new ErrorResponse(`Event not found with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: event,
  });
});

// @desc    Create event
exports.createEvent = asyncHandler(async (req, res) => {
  const { title, description, tagLines, eventDate, price } = req.body;

  const image = req.file ? `uploads/${req.file.filename}` : null;

  const event = await Event.create({
    title,
    description,
    tagLines: tagLines || [],
    image,
    eventDate,
    price,
  });

  res.status(201).json({
    success: true,
    data: event,
  });
});

// @desc    Update event
exports.updateEvent = asyncHandler(async (req, res, next) => {
  const updates = { ...req.body };

  if (req.file) {
    updates.image = `uploads/${req.file.filename}`;
  }

  const event = await Event.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  });

  if (!event) {
    return next(
      new ErrorResponse(`Event not found with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: event,
  });
});

// @desc    Delete event
exports.deleteEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.findByIdAndDelete(req.params.id);

  if (!event) {
    return next(
      new ErrorResponse(`Event not found with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});

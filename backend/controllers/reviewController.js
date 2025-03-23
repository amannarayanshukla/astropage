const Review = require("../models/Review");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

exports.getAllReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    count: reviews.length,
    data: reviews,
  });
});

exports.getReviewById = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(
      new ErrorResponse(`Review not found with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: review,
  });
});

exports.createReview = asyncHandler(async (req, res) => {
  const { rating, description, userName, company, designation } = req.body;

  const image = req.files.image
    ? `uploads/${req.files.image[0].filename}`
    : null;

  const logo = req.files.logo ? `uploads/${req.files.logo[0].filename}` : null;

  const review = await Review.create({
    rating,
    description,
    userName,
    image,
    company,
    designation,
    logo,
  });

  res.status(201).json({
    success: true,
    data: review,
  });
});

exports.updateReview = asyncHandler(async (req, res, next) => {
  const updates = { ...req.body };

  if (req.files?.image.length) {
    updates.image = `uploads/${req.files.image[0].filename}`;
  }

  if (req.files?.logo.length) {
    updates.logo = `uploads/${req.files.logo[0].filename}`;
  }

  const review = await Review.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  });

  if (!review) {
    return next(
      new ErrorResponse(`Review not found with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: review,
  });
});

exports.deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findByIdAndDelete(req.params.id);

  if (!review) {
    return next(
      new ErrorResponse(`Review not found with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});

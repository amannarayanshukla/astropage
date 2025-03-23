const Product = require("../models/Product");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get all products
exports.getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    count: products.length,
    data: products,
  });
});

// @desc    Get single product
exports.getProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc    Create product
exports.createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    rating,
    numberOfReviews,
    variant,
    details,
    shipping,
    returns,
  } = req.body;

  // Handle uploaded files
  const images = req.files?.map((file) => `uploads/${file.filename}`) || [];
  const pShipping = shipping || process.env.PRODUCT_SHIPPING_INFORMATION;
  const pReturns = returns || process.env.PRODUCT_RETURNS_INFORMATION;

  const product = await Product.create({
    name,
    description,
    price,
    images,
    rating,
    numberOfReviews,
    variant,
    details,
    shipping: pShipping,
    returns: pReturns,
  });

  res.status(201).json({
    success: true,
    data: product,
  });
});

// @desc    Update product
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const updates = { ...req.body };

  if (req.files?.length) {
    updates.images = req.files.map((file) => `uploads/${file.filename}`);
  }

  const product = await Product.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc    Delete product
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});

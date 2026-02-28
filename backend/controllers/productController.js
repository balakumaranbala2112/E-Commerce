import Product from "../models/productModel.js";
import errorHandler from "../helper/handleError.js";
import APIhelper from "../helper/APIhelper.js";

//Add Product
export const addProducts = async (req, res) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
};

export const getAllProducts = async (req, res, next) => {
  try {
    const resultPerPage = 8;

    const apiHelper = new APIhelper(
      Product.find().sort({ createdAt: 1 }),
      req.query,
    )
      .search()
      .filter();

    const filteredQuery = apiHelper.query.clone();
    const productCount = await filteredQuery.countDocuments();

    const totalPages = Math.ceil(productCount / resultPerPage);
    const page = Math.max(Number(req.query.page) || 1, 1);

    if (totalPages > 0 && page > totalPages) {
      return next(new errorHandler("This page doesn't exist", 404));
    }

    apiHelper.pagination(resultPerPage);

    const products = await apiHelper.query;

    res.status(200).json({
      success: true,
      products,
      productCount,
      resultPerPage,
      totalPages,
      currentPage: page,
    });
  } catch (err) {
    next(err);
  }
};

//Get Single Product
export const getSingleProduct = async (req, res, next) => {
  const id = req.params.id;
  console.log(id);

  let product = await Product.findById(id);
  console.log(product);

  if (!product) {
    return next(new errorHandler("Product Not Found", 404));
  }
  res.status(200).json({ success: true, product });
};

//Update Product
export const updateProduct = async (req, res, next) => {
  const id = req.params.id;
  let product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return next(new errorHandler("Product Not Found", 404));
  }
  res.status(200).json({ success: true, product });
};

export const deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  let product = await Product.findByIdAndDelete(id);
  console.log(product);

  if (!product) {
    return next(new errorHandler("Product Not Found", 404));
  }
  res.status(200).json({ success: true, message: "Product deleted success" });
};

export const createProductReview = async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    avatar: req.user.avatar.url,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);
  if (!product) {
    return next(new errorHandler("Product Not Found", 404));
  }

  const reviewExists = product.reviews.find(
    (review) => review.user.toString() === req.user.id,
  );

  if (reviewExists) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user.id) {
        review.rating = rating;
        review.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
  }

  product.numOfReviews = product.reviews.length;

  let sum = 0;
  product.reviews.forEach((review) => {
    sum = sum + review.rating;
  });

  product.ratings =
    product.reviews.length > 0 ? sum / product.reviews.length : 0;

  await product.save({ validateBeforeSave: false });
  res.status(200).json({ success: true, product });
};

export const viewProductReviews = async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new errorHandler("Product Not Found", 404));
  }
  res.status(200).json({ success: true, reviews: product.reviews });
};

//Admin View All Products

export const getAllProductsByAdmin = async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
};

export const adminDeleteReview = async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new errorHandler("Product Not Found", 404));
  }
  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString(),
  );
  console.log("Before:", product.reviews.length, "After:", reviews.length);

  let sum = 0;
  reviews.forEach((review) => {
    sum = sum + review.rating;
  });

  const ratings = reviews.length > 0 ? sum / reviews.length : 0;
  const numOfReviews = reviews.length;

  // ✅ FIX — use $set so MongoDB explicitly replaces the fields
  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      $set: {
        reviews,
        ratings,
        numOfReviews,
      },
    },
    { new: true, runValidators: true },
  );
  res
    .status(200)
    .json({ success: true, message: "Review Deleted successfully" });
};

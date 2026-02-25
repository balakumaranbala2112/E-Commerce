import Product from "../models/productModel.js";
import errorHandler from "../helper/handleError.js";
import APIhelper from "../helper/APIhelper.js";

//Add Product
export const addProducts = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
};

export const getAllProducts = async (req, res, next) => {
  try {
    const resultPerPage = 4;

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

import Product from "../models/productModel.js";

//Add Product
export const addProducts = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
};

// Get All Products
export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ success: true, products });
};

//Get Single Product
export const getSingleProduct = async (req, res) => {
  const id = req.params.id;
  let product = await Product.findById(id);
  if (!product) {
    res.status(500).json({ success: false, message: "Product Not Found" });
  }
  res.status(200).json({ success: true, product });
};

//Update Product
export const updateProduct = async (req, res) => {
  const id = req.params.id;
  let product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    res.status(500).json({ success: false, message: "Product Not Found" });
  }
  res.status(200).json({ success: true, product });
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  let product = await Product.findByIdAndDelete(id);
  console.log(product);

  if (!product) {
    res.status(500).json({ success: false, message: "Product Not Found" });
  }
  res.status(200).json({ success: true, message: "Product deleted success" });
};

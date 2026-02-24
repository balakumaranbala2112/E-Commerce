export const getAllProducts = (req, res) => {
  res.status(200).json({ message: "All Products" });
};

export const getSingleProduct = (req, res) => {
  res.status(200).json({ message: "one Products" });
};

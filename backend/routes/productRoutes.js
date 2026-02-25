import express from "express";
import {
  getAllProducts,
  getSingleProduct,
  addProducts,
  updateProduct,
  deleteProduct,
  createProductReview,
  viewProductReviews,
  getAllProductsByAdmin,
  adminDeleteReview,
} from "../controllers/productController.js";
import { roleBasedAccess, verifyUser } from "../helper/useAuth.js";

const router = express.Router();

//User Side
router.get("/products", getAllProducts);
router.get("/products/:id", getSingleProduct);
router.route("/review").put(verifyUser, createProductReview);

//Admin
router
  .route("/admin/product/create")
  .post(verifyUser, roleBasedAccess("admin"), addProducts);

router
  .route("/admin/product/product/:id")
  .put(verifyUser, roleBasedAccess("admin"), updateProduct)
  .delete(verifyUser, roleBasedAccess("admin"), deleteProduct);

// Admin View All products && View Review and Delete
router
  .route("/admin/reviews")
  .get(verifyUser, roleBasedAccess("admin"), viewProductReviews)
  .delete(verifyUser, roleBasedAccess("admin"), adminDeleteReview);

router
  .route("/admin/products")
  .get(verifyUser, roleBasedAccess("admin"), getAllProductsByAdmin);

export default router;

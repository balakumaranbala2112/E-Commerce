import express from "express";
import {
  getAllProducts,
  getSingleProduct,
  addProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { verifyUser } from "../helper/useAuth.js";

const router = express.Router();

router.route("/products").get(verifyUser, getAllProducts).post(addProducts);
router
  .route("/product/:id")
  .get(getSingleProduct)
  .put(updateProduct)
  .delete(deleteProduct);

export default router;

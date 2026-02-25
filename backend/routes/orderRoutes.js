import express from "express";
import { roleBasedAccess, verifyUser } from "../helper/useAuth.js";
import {
  createNewOrder,
  deleteOrder,
  getAllOrders,
  getAllOrdersByAdmin,
  getOrderDetails,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

router.route("/new/order").post(verifyUser, createNewOrder);
router.route("/order/:id").get(verifyUser, getOrderDetails);
router.route("/orders/user").get(verifyUser, getAllOrders);

//admin
router
  .route("/admin/orders")
  .get(verifyUser, roleBasedAccess("admin"), getAllOrdersByAdmin);

router
  .route("/admin/order/:id")
  .delete(verifyUser, roleBasedAccess("admin"), deleteOrder);

// admin routes
router.get(
  "/admin/orders",
  verifyUser,
  roleBasedAccess("admin"),
  getAllOrdersByAdmin,
);

router.delete(
  "/admin/order/:id",
  verifyUser,
  roleBasedAccess("admin"),
  deleteOrder,
);

router.put(
  "/admin/order/:id",
  verifyUser,
  roleBasedAccess("admin"),
  updateOrderStatus,
);
export default router;

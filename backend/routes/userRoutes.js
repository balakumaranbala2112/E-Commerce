import express from "express";
import {
  deleteUser,
  forgetPassword,
  getSingleUser,
  getUsers,
  loginUser,
  logout,
  profile,
  registerUser,
  resetPassword,
  updatePassword,
  updateProfile,
  updateUserRole,
} from "../controllers/userController.js";
import { roleBasedAccess, verifyUser } from "../helper/useAuth.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/password/forget").post(forgetPassword);
router.route("/reset/:token").post(resetPassword);
router.route("/profile").get(verifyUser, profile);
router.route("/password/update").put(verifyUser, updatePassword);
router.route("/profile/update").put(verifyUser, updateProfile);

router
  .route("/admin/users")
  .get(verifyUser, roleBasedAccess("admin"), getUsers);
router
  .route("/admin/users/:id")
  .get(verifyUser, roleBasedAccess("admin"), getSingleUser)
  .put(verifyUser, roleBasedAccess("admin"), updateUserRole)
  .delete(verifyUser, roleBasedAccess("admin"), deleteUser);

export default router;

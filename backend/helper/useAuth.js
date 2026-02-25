import HandleError from "./handleError.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const verifyUser = async (req, res, next) => {
  const { token } = req.cookies;
  //   console.log(token);
  if (!token) {
    return next(new HandleError("Access Denied", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
  //   console.log(decodedData);
  req.user = await User.findById(decodedData.id);
  //   console.log(req.User);
  next();
};

// ["admin","superadmin"]

export const roleBasedAccess = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new HandleError(
          `Role - ${req.user.role} is not allowed to acces this resource`,
          403,
        ),
      );
    }
    next();
  };
};

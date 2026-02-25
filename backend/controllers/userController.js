import HandleError from "../helper/handleError.js";
import sendToken from "../helper/jwtToken.js";
import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";

export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const userExists = await User.findOne({ email }).select("+password");

  if (userExists) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "default_id",
      url: "default_url",
    },
  });

  sendToken(user, 201, res);
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new HandleError("Email or Password cannot be empty", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new HandleError("Invalid email or password", 401));
  }
  const isPasswordMatched = await user.verifyPassword(password);

  if (!isPasswordMatched) {
    return next(new HandleError("Invalid email or password", 401));
  }
  // ✅ FIX — add this line at the end
  sendToken(user, 200, res);
};

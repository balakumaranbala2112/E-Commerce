import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter your Name"],
      minLength: [3],
    },
    email: {
      type: String,
      required: [true, "Please Enter your E-mai ID"],
      unique: true,
      validate: [validator.isEmail, "Please Enter Valid Address"],
    },
    password: {
      type: String,
      required: [true, "Please Enter your E-mai ID"],
      minLength: [8, "Please enter minimum 8 character"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcryptjs.hash(this.password, 10);
});

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

userSchema.methods.verifyPassword = async function (userPassword) {
  return await bcryptjs.compare(userPassword, this.password);
};

export default mongoose.model("User", userSchema);

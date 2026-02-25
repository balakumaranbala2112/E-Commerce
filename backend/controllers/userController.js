// ============================================================
// userController.js
// Handles all user-related operations:
// register, login, logout, forget/reset password,
// profile view, update profile, update password
// ============================================================

import HandleError from "../helper/handleError.js";
import sendToken from "../helper/jwtToken.js";
import { sendEmail } from "../helper/sendEmail.js";
import User from "../models/userModel.js";
import crypto from "crypto";

// ─────────────────────────────────────────────
// @route   POST /api/v1/register
// @access  Public
// @desc    Creates a new user in the database
// ─────────────────────────────────────────────
export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  // Check all fields are provided
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  // Check if user with same email already exists
  const userExists = await User.findOne({ email }).select("+password");
  if (userExists) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  // Create user — password is hashed automatically via userSchema.pre("save")
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "default_id", // Replace with Cloudinary upload later
      url: "default_url",
    },
  });

  // Generate JWT token and send as cookie + response
  sendToken(user, 201, res);
};

// ─────────────────────────────────────────────
// @route   POST /api/v1/login
// @access  Public
// @desc    Verifies credentials and logs in user
// ─────────────────────────────────────────────
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  // Check both fields are provided
  if (!email || !password) {
    return next(new HandleError("Email or Password cannot be empty", 400));
  }

  // Find user — password is select:false in schema so we force-select it here
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new HandleError("Invalid email or password", 401));
  }

  // Compare entered password with hashed password in DB
  // verifyPassword() is defined in userModel.js using bcryptjs.compare
  const isPasswordMatched = await user.verifyPassword(password);
  if (!isPasswordMatched) {
    return next(new HandleError("Invalid email or password", 401));
  }

  // Login success — send JWT token
  sendToken(user, 200, res);
};

// ─────────────────────────────────────────────
// @route   GET /api/v1/logout
// @access  Private
// @desc    Clears the token cookie to log out user
// ─────────────────────────────────────────────
export const logout = async (req, res, next) => {
  // Set cookie expiry to right now so browser immediately deletes it
  const options = {
    expires: new Date(Date.now()),
    httpOnly: true,
  };

  res.cookie("token", null, options);
  res.status(200).json({ success: true, message: "Successfully Logged Out" });
};

// ─────────────────────────────────────────────
// @route   POST /api/v1/password/forget
// @access  Public
// @desc    Generates reset token and emails reset link to user
// ─────────────────────────────────────────────
export const forgetPassword = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new HandleError("User does not Exists", 400));
  }

  let resetToken;

  try {
    // createPasswordResetToken() does 3 things (defined in userModel.js):
    // 1. Creates a plain random token (returned → sent to user via email)
    // 2. Hashes it and saves as resetPasswordToken in DB
    // 3. Sets resetPasswordExpire to 30 minutes from now in DB
    resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false }); // skip validation — only token fields changed
  } catch (error) {
    return next(
      new HandleError("Could not save reset token, Try again later", 500),
    );
  }

  // This URL is sent to user — frontend should have a page at /reset/:token
  const resetPasswordURL = `${req.protocol}://${req.host}/reset/${resetToken}`;

  // Plain text fallback for email clients that don't support HTML
  const message = `Reset your password using the link below:\n${resetPasswordURL}\n\nThis link expires in 30 minutes.\n\nIf this wasn't you, please ignore this message.`;

  // HTML version of the email
  const htmlMessage = `
<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding: 40px 0;">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <tr>
              <td style="background-color:#4f46e5; padding:30px; text-align:center;">
                <h1 style="color:#ffffff; margin:0; font-size:24px;">Password Reset Request</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:40px 30px;">
                <p style="color:#333333; font-size:16px; margin:0 0 20px;">Hi <strong>${user.name}</strong>,</p>
                <p style="color:#555555; font-size:15px; line-height:1.6; margin:0 0 30px;">
                  We received a request to reset your password. Click the button below to reset it.
                  This link will expire in <strong>30 minutes</strong>.
                </p>

                <!-- Reset Button -->
                <table cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td align="center">
                      <a href="${resetPasswordURL}"
                        style="display:inline-block; background-color:#4f46e5; color:#ffffff; text-decoration:none;
                               padding:14px 32px; border-radius:6px; font-size:16px; font-weight:bold;">
                        Reset Password
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="color:#888888; font-size:13px; margin:30px 0 0; line-height:1.6;">
                  If the button doesn't work, copy and paste this link into your browser:<br/>
                  <a href="${resetPasswordURL}" style="color:#4f46e5;">${resetPasswordURL}</a>
                </p>

                <p style="color:#888888; font-size:13px; margin:20px 0 0;">
                  If you didn't request this, you can safely ignore this email.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color:#f9f9f9; padding:20px 30px; text-align:center; border-top:1px solid #eeeeee;">
                <p style="color:#aaaaaa; font-size:12px; margin:0;">© 2024 Your App Name. All rights reserved.</p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message, // plain text fallback
      htmlMessage, // HTML version — sendEmail.js reads this as options.htmlMessage
    });

    res.status(200).json({
      success: true,
      message: `Email is sent to ${user.email} successfully`,
    });
  } catch (error) {
    // If email fails — clear the token from DB so user can try again
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new HandleError("Email could not be sent, Try again later", 500),
    );
  }
};

// ─────────────────────────────────────────────
// @route   POST /api/v1/reset/:token
// @access  Public
// @desc    Verifies reset token and updates password
// ─────────────────────────────────────────────
export const resetPassword = async (req, res, next) => {
  // Hash the token from URL params — must match what's stored in DB
  // DB stores hashed version, email contains plain version → hash plain → compare
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  // Find user with matching token that hasn't expired yet
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }, // $gt = greater than → token still valid
  });

  if (!user) {
    return next(new HandleError("Invalid or expired reset link", 400));
  }

  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return next(new HandleError("Passwords don't match", 400));
  }

  // Set new password — will be hashed automatically by userSchema.pre("save")
  user.password = password;
  user.resetPasswordToken = undefined; // clear token after use
  user.resetPasswordExpire = undefined;
  await user.save();

  // Log user in immediately after reset
  sendToken(user, 200, res);
};

// ─────────────────────────────────────────────
// @route   GET /api/v1/profile
// @access  Private (requires verifyUser middleware)
// @desc    Returns logged-in user's profile
// ─────────────────────────────────────────────
export const profile = async (req, res, next) => {
  // req.user.id is set by verifyUser middleware in useAuth.js
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
};

// ─────────────────────────────────────────────
// @route   PUT /api/v1/profile/update
// @access  Private (requires verifyUser middleware)
// @desc    Updates name and email of logged-in user
// ─────────────────────────────────────────────
export const updateProfile = async (req, res, next) => {
  const { name, email } = req.body;

  const updatedUserDetails = { name, email };

  // findByIdAndUpdate — new:true returns updated doc, runValidators checks schema rules
  const user = await User.findByIdAndUpdate(req.user.id, updatedUserDetails, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Profile Updated Successfully",
    user,
  });

  // NOTE: No need to call sendToken here — profile update doesn't require new token
};

// ─────────────────────────────────────────────
// @route   PUT /api/v1/password/update
// @access  Private (requires verifyUser middleware)
// @desc    Updates password after verifying old password
// ─────────────────────────────────────────────
export const updatePassword = async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  // Must select +password because it's select:false in the schema
  const user = await User.findById(req.user.id).select("+password");

  // verifyPassword() is an instance method on user document (defined in userModel.js)
  // IMPORTANT: use lowercase 'user' (document instance) NOT uppercase 'User' (Model)
  const isCorrect = await user.verifyPassword(oldPassword);
  if (!isCorrect) {
    return next(new HandleError("Old password is incorrect", 400));
  }

  if (newPassword !== confirmPassword) {
    return next(new HandleError("New and confirm password do not match", 400));
  }

  // Assign new password — hashed automatically by userSchema.pre("save")
  user.password = newPassword;
  await user.save();

  // Send new token so user stays logged in after password change
  sendToken(user, 200, res);
};

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
};

export const getSingleUser = async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    return next(new HandleError("User Not Found", 404));
  }
  res.status(200).json({
    success: true,
    user,
  });
};

export const updateUserRole = async (req, res, next) => {
  const { role } = req.body;
  const id = req.params.id;
  const updateRole = { role };
  const user = await User.findByIdAndUpdate(id, updateRole);
  if (!user) {
    return next(new HandleError("User Not Found", 404));
  }
  res.status(200).json({
    success: true,
    user,
  });
};

export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    return next(new HandleError("User Not Found", 404));
  }
  await User.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
};

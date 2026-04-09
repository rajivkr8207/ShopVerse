import { User } from "../models/user.model.js";
import { PasswordReset } from "../models/passwordReset.model.js";
import { ApiError } from "../utils/ApiError.js";
import crypto from "crypto";
import { sendResetPasswordEmail } from "./email.service.js";

export const requestPasswordReset = async (email: string) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not found with this email");
    }

    // Generate random token
    const token = crypto.randomBytes(32).toString("hex");

    // Save to database
    await PasswordReset.create({
        userId: user._id,
        token: token
    });

    // Prepare reset URL
    const resetUrl = `http://localhost:5173/reset-password?token=${token}`;
    const message = `You requested a password reset. Please click on the following link or paste it into your browser to complete the process:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.`;

    await sendResetPasswordEmail(user.email, user.fullname, token);

    return token;
};

export const processPasswordReset = async (token: string, newPassword: string) => {
    // Find the non-expired token
    const passwordResetDoc = await PasswordReset.findOne({ token });
    if (!passwordResetDoc) {
        throw new ApiError(400, "Invalid or expired password reset token");
    }

    // Find the user and select the password field so we can update and save it
    const user = await User.findById(passwordResetDoc.userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Update password
    user.password = newPassword;
    await user.save(); // Will trigger the pre("save") hook to hash the new password

    // Clean up the used token
    await PasswordReset.deleteOne({ _id: passwordResetDoc._id });

    return user;
};

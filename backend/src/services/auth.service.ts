import { User } from "../models/user.model.js";
import type { IUser } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { config } from "../config/config.js";

export const createUser = async ({ fullname, email, password, contact }: { fullname: string, email: string, password: string, contact: string }) => {
    const existingUser = await User.findOne({ email: email } as any);
    if (existingUser) {
        throw new ApiError(400, "User with this email already exists");
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpire = new Date(Date.now() + 10 * 60 * 1000);

    const user = await User.create({ fullname, email, password, contact, otp, otpExpire, isVerified: false });
    return user;
};

export const verifyEmailService = async (email: string, otp: string) => {
    const user = await User.findOne({ email }).select("+otp +otpExpire");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Check if already verified
    if (user.isVerified) {
        throw new ApiError(400, "User is already verified");
    }

    // Check if OTP matches and hasn't expired
    if (!user.otp || user.otp !== otp || !user.otpExpire || user.otpExpire < new Date()) {
        throw new ApiError(400, "Invalid or expired OTP");
    }

    // Mark as verified and clear OTP
    user.isVerified = true;
    user.otp = undefined as any;
    user.otpExpire = undefined as any;

    await user.save();
    return user;
};

export const validateUser = async (email: string, password: string): Promise<IUser> => {
    // We need to select the password field because it has select: false in the model
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid email or password");
    }

    return user;
};

export const generateAuthToken = (userId: string | unknown, role: string) => {
    const payload = { id: userId, role };
    return jwt.sign(payload, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRES_IN as any });
};

import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createUser, validateUser, generateAuthToken, verifyEmailService } from "../services/auth.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { verifyEmailsendemail } from "../services/email.service.js";
import { mailQueue } from "../queues/mail.queue.js";

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const register = asyncHandler(async (req: Request, res: Response) => {
    const { fullname, email, password, contact } = req.body
    const user = await createUser({ fullname, email, password, contact });
    const token = generateAuthToken(user._id, user.role);

    await mailQueue.add('verifyMail', { email, name: fullname, otp: user.otp })
    return res.status(201).json(
        new ApiResponse(201, { user, token }, "User registered successfully, verification email sent")
    );
});

export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        throw new ApiError(400, "Email and OTP are required");
    }

    await verifyEmailService(email, otp);

    return res.status(200).json(
        new ApiResponse(200, {}, "Email successfully verified")
    );
});

export const login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await validateUser(email, password);
    const token = generateAuthToken(user._id, user.role);

    // Set cookie
    res.cookie("snitch_token", token as string, cookieOptions);
    const userdata = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        contact: user.contact,
        role: user.role,
        isVerified: user.isVerified,
        isBlocked: user.isBlocked
    }
    return res.status(200).json(
        new ApiResponse(200, { user: userdata, token }, "User logged in successfully")
    );
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
    // The user attaches dynamically by the `protect` middleware
    return res.status(200).json(
        new ApiResponse(200, req.user, "User profile fetched successfully")
    );
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
    res.cookie("snitch_token", "none", {
        ...cookieOptions,
        expires: new Date(Date.now() + 10 * 1000), // expires in 10 seconds
        httpOnly: true,
    });

    return res.status(200).json(
        new ApiResponse(200, {}, "User logged out successfully")
    );
});

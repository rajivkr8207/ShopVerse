import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { requestPasswordReset, processPasswordReset } from "../services/passwordReset.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;
    
    const token = await requestPasswordReset(email);

    return res.status(200).json(
        new ApiResponse(200, { token }, "Password reset token generated and sent to email")
    );
});

export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const { token, newPassword } = req.body;
    
    await processPasswordReset(token, newPassword);

    return res.status(200).json(
        new ApiResponse(200, {}, "Password has been successfully reset")
    );
});

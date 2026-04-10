import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { config } from "../config/config.js";

declare global {
    namespace Express {
        interface Request {
            user?: { id: string, role: string }
        }
    }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies.snitch_token;
    if (!token) {
        throw new ApiError(401, "Not authorized to access this route. Please login.");
    }
    let decoded;
    try {
        decoded = jwt.verify(token, config.JWT_SECRET) as { id: string, role: string };
    } catch (error) {
        throw new ApiError(401, "Invalid or expired token");
    }

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        throw new ApiError(401, "The user belonging to this token no longer exists.");
    }

    req.user = decoded;
    next();
};

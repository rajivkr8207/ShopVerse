import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import type { IUser } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { config } from "../config/config.js";

// Extend the Express Request to include the user object
declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token;

        // 1) Extract token from cookies or authorization header
        if (req.cookies && req.cookies.snitch_token) {
            token = req.cookies.snitch_token;
        } else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            throw new ApiError(401, "Not authorized to access this route. Please login.");
        }

        // 2) Verify token
        const decoded = jwt.verify(token, config.JWT_SECRET) as { id: string, role: string };

        // 3) Check if user still exists
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            throw new ApiError(401, "The user belonging to this token no longer exists.");
        }

        // Grant access to protected route by attaching user to request object
        req.user = currentUser;
        next();
    } catch (error) {
        next(new ApiError(401, "Invalid or expired token"));
    }
};

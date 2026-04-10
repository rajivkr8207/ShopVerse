import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";

export const isSeller = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        throw new ApiError(401, "Unauthorized. Please login first.");
    }

    if (req.user.role !== "seller") {
        throw new ApiError(403, "Access denied. Seller only route.");
    }

    next();
};
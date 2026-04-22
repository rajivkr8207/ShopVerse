import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";

export const isBuyer = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        throw new ApiError(401, "Unauthorized. Please login first.");
    }
    const user = req.user as any;
    if (user.role !== "buyer") {
        throw new ApiError(403, "Access denied. buyer only route.");
    }
    next();
};
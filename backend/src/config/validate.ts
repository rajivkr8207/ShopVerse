import { validationResult } from "express-validator";
import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";
export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((err) => err.msg);
        throw new ApiError(400, "Validation failed", errorMessages);
    }
    next();
};

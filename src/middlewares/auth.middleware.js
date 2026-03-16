import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";


export const isAuthenticated = asyncHandler(async (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        throw new ApiError(401, "Unauthorized");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        throw new ApiError(401, "Unauthorized");
    }

});
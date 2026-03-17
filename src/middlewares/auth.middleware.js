import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import config from "../config/config.js";
import redis from "../config/redis.js";


export const isAuthenticated = asyncHandler(async (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        throw new ApiError(401, "Unauthorized");
    }
    const isTokenBlacklisted = await redis.get(token)
    if(isTokenBlacklisted){
        throw new ApiError(401, "Token expired ");
    }
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        throw new ApiError(401, "Unauthorized");
    }

});
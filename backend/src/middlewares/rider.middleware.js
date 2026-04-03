import ApiError from "../utils/ApiError.js";

export const isRider = (req, res, next) => {
    if (req.user.role !== "RIDER") {
        throw new ApiError(403, "Access denied. Rider only");
    }
    next();
};  
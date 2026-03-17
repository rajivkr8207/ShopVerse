import ApiError from "../utils/ApiError.js";

export const isSeller = (req, res, next) => {
    if (req.user.role !== "SELLER") {
        throw new ApiError(403, "Access denied. Seller only");
    }
    next();
};  
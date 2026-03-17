import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import Sellermodel from "../models/seller.model.js";
import Usermodel from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";

export const verifySeller = asyncHandler(async (req, res) => {

    const { sellerId } = req.params;

    const seller = await Sellermodel.findById(sellerId);

    if (!seller) {
        throw new ApiError(404, "Seller not found");
    }

    // find user
    const user = await Usermodel.findById(seller.userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // check role
    if (user.role !== "SELLER") {
        throw new ApiError(400, "User is not a seller");
    }

    seller.isVerified = true;
    user.isverify = true;

    await seller.save();
    await user.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                sellerId: seller._id,
                shopName: seller.shopName,
                isVerified: seller.isVerified
            },
            "Seller verified successfully"
        )
    );

});
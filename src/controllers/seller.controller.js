import sellerServices from "../services/seller.services.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const registerSeller = asyncHandler(async (req, res) => {
    const { user, seller } = await sellerServices.registerSeller(req.body);
    return res.status(201).json(
        new ApiResponse(
            201,
            {
                userId: user._id,
                shopName: seller.shopName
            },
            "Seller registered successfully"
        )
    );
});


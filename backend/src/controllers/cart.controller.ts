import type { Request, Response } from "express";
import { cartService } from "../services/cart.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addToCart = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    console.log(req.body);
    if (!userId) {
        throw new ApiError(401, "Unauthorized");
    }

    const item = await cartService.addToCart(userId, req.body);

    return res.status(201).json(
        new ApiResponse(201, item, "Item added to cart")
    );
});

export const getCart = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;

    const cart = await cartService.getUserCart(userId!);

    return res.status(200).json(
        new ApiResponse(200, cart, "Cart fetched successfully")
    );
});

export const updateCart = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { quantity } = req.body;

    const item = await cartService.updateQuantity(id as string, quantity);

    if (!item) {
        throw new ApiError(404, "Cart item not found");
    }

    return res.status(200).json(
        new ApiResponse(200, item, "Cart updated")
    );
});

export const deleteCartItem = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const item = await cartService.removeItem(id as string);

    if (!item) {
        throw new ApiError(404, "Cart item not found");
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Item removed from cart")
    );
});

export const clearCart = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;

    await cartService.clearCart(userId!);

    return res.status(200).json(
        new ApiResponse(200, {}, "Cart cleared")
    );
});
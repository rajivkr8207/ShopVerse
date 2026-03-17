import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { CartModel } from "../models/cart.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import Productmodel from "../models/product.model.js";


export const addToCart = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
        throw new ApiError(400, "ProductId and quantity required");
    }

    const product = await Productmodel.findById(productId);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    let cart = await CartModel.findOne({ userId });

    if (!cart) {
        cart = await CartModel.create({
            userId,
            items: [],
            totalPrice: 0
        });
    }

    const existingItemIndex = cart.items.findIndex(
        item => item.productId.toString() === productId
    );

    if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += quantity;
    } else {
        cart.items.push({
            productId,
            title: product.title,
            price: product.price,
            quantity,
            thumbnail: product.thumbnail
        });
    }

    cart.totalPrice = cart.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    await cart.save();

    res.status(200).json(new ApiResponse(200, cart, "Product added to cart"));
});


export const getCart = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const cart = await CartModel.findOne({ userId });

    if (!cart) {
        return res.status(200).json({
            success: true,
            cart: { items: [], totalPrice: 0 }
        });
    }

    res.status(200).json(new ApiResponse(200, cart,));
});


export const updateCartItem = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (quantity < 1) {
        throw new ApiError(400, "Quantity must be at least 1");
    }

    const cart = await CartModel.findOne({ userId });

    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }

    const item = cart.items.find(
        item => item.productId.toString() === productId
    );

    if (!item) {
        throw new ApiError(404, "Item not in cart");
    }

    item.quantity = quantity;

    cart.totalPrice = cart.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    await cart.save();

    res.status(200).json(new ApiResponse(200, cart, "Cart updated"));
});


export const removeFromCart = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.params;

    const cart = await CartModel.findOne({ userId });

    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }

    cart.items = cart.items.filter(
        item => item.productId.toString() !== productId
    );

    cart.totalPrice = cart.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    await cart.save();

    res.status(200).json(new ApiResponse(200, cart, "Item removed"));
});


export const clearCart = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    await CartModel.findOneAndUpdate(
        { userId },
        { items: [], totalPrice: 0 }
    );

    res.status(200).json(new ApiResponse(200, "CartCleared"));
});
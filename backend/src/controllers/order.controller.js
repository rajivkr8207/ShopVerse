import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { CartModel } from "../models/cart.model.js";
import Addressmodel from "../models/address.model.js";
import Productmodel from "../models/product.model.js";
import { OrderModel } from "../models/order.model.js";


// 🛒 CREATE ORDER (Cart → Order)
export const createOrder = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { addressId, paymentMethod } = req.body;

    if (!addressId || !paymentMethod) {
        throw new ApiError(400, "Address and payment method required");
    }

    const cart = await CartModel.findOne({ userId });

    if (!cart || cart.items.length === 0) {
        throw new ApiError(400, "Cart is empty");
    }

    const address = await Addressmodel.findById(addressId);

    if (!address) {
        throw new ApiError(404, "Address not found");
    }

    let itemsPrice = 0;

    const orderItems = [];

    for (const item of cart.items) {
        const product = await Productmodel.findById(item.productId);

        if (!product) {
            throw new ApiError(404, `Product not found: ${item.productId}`);
        }

        if (product.stock < item.quantity) {
            throw new ApiError(400, `${product.title} out of stock`);
        }

        product.stock -= item.quantity;
        await product.save();

        const itemTotal = product.price * item.quantity;
        itemsPrice += itemTotal;

        orderItems.push({
            productId: product._id,
            title: product.title,
            price: product.price,
            quantity: item.quantity,
            thumbnail: product.thumbnail
        });
    }

    const tax = Math.round(itemsPrice * 0.05); // 5% tax
    const deliveryCharge = itemsPrice > 500 ? 0 : 50;
    const discount = 0;

    const totalPrice = itemsPrice + tax + deliveryCharge - discount;

    const order = await OrderModel.create({
        userId,
        items: orderItems,

        shippingAddress: addressId,

        paymentInfo: {
            method: paymentMethod,
            status: paymentMethod === "COD" ? "PENDING" : "PENDING"
        },

        pricing: {
            itemsPrice,
            tax,
            deliveryCharge,
            discount,
            totalPrice
        }
    });

    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(201).json(new ApiResponse(201, order, "Order placed successfully"));
});


// 📦 GET MY ORDERS
export const getMyOrders = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    // query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    // total count
    const totalOrders = await OrderModel.countDocuments({ userId });

    // fetch paginated orders
    const orders = await OrderModel.find({ userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const totalPages = Math.ceil(totalOrders / limit);

    res.status(200).json(
        new ApiResponse(200, {
            page,
            limit,
            totalOrders,
            totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
            orders
        })
    );
});

// 🔍 GET ORDER BY ID
export const getOrderById = asyncHandler(async (req, res) => {
    const { orderId } = req.params;

    const order = await OrderModel.findById(orderId);

    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    res.status(200).json(new ApiResponse(200, order));
});


export const cancelOrder = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { orderId } = req.params;

    const order = await OrderModel.findById(orderId);

    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    if (order.userId.toString() !== userId.toString()) {
        throw new ApiError(403, "Unauthorized");
    }

    if (order.orderStatus !== "PLACED") {
        throw new ApiError(400, "Order cannot be cancelled");
    }

    // restore stock
    for (const item of order.items) {
        const product = await Productmodel.findById(item.productId);
        if (product) {
            product.stock += item.quantity;
            await product.save();
        }
    }

    order.orderStatus = "CANCELLED";
    await order.save();

    res.status(200).json(new ApiResponse(200, order, "Order cancelled"));
});



// export const updateOrderStatus = asyncHandler(async (req, res) => {
//     const { orderId } = req.params;
//     const { status } = req.body;

//     const order = await OrderModel.findById(orderId);

//     if (!order) {
//         throw new ApiError(404, "Order not found");
//     }

//     order.orderStatus = status;

//     if (status === "DELIVERED") {
//         order.deliveredAt = new Date();
//     }

//     await order.save();

//     res.status(200).json(new ApiResponse(200, order, "Order updated"));
// });
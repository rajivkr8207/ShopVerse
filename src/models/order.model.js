import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    thumbnail: String
}, { _id: false });



const paymentInfoSchema = new mongoose.Schema({
    method: {
        type: String,
        enum: ["COD", "ONLINE"],
        required: true
    },
    status: {
        type: String,
        enum: ["PENDING", "SUCCESS", "FAILED"],
        default: "PENDING"
    },
    transactionId: String
}, { _id: false });

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
   
    items: [orderItemSchema],

    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true
    },

    paymentInfo: paymentInfoSchema,

    pricing: {
        itemsPrice: { type: Number, required: true },
        tax: { type: Number, default: 0 },
        deliveryCharge: { type: Number, default: 0 },
        discount: { type: Number, default: 0 },
        totalPrice: { type: Number, required: true }
    },

    orderStatus: {
        type: String,
        enum: ["PLACED", "ASSIGNED", "PICKED", "DELIVERED", "CANCELLED"],
        default: "PLACED"
    },

    deliveredAt: Date
}, {
    timestamps: true
});

export const OrderModel = mongoose.model("Order", orderSchema);
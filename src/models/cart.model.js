import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
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
        required: true,
        min: 1
    },
    thumbnail: {
        type: String
    }
}, { _id: false });

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true   // 1 user = 1 cart
    },
    items: [cartItemSchema],

    totalPrice: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

export const CartModel = mongoose.model("Cart", cartSchema);
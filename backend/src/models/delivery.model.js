import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },

    riderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    status: {
        type: String,
        enum: ["ASSIGNED", "PICKED", "DELIVERED", "CANCEL"],
        default: "ASSIGNED"
    },

    pickedAt: Date,
    deliveredAt: Date,

    paymentType: {
        type: String,
        enum: ["COD", "ONLINE"],
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    cashCollected: {
        type: Number,
        default: 0
    }

}, { timestamps: true });

export const DeliveryModel = mongoose.model("Delivery", deliverySchema);
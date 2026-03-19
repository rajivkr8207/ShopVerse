import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    riderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    amount: {
        type: Number,
        required: true
    },

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

    transactionId: String,

    paidAt: Date

}, { timestamps: true });

export const PaymentModel = mongoose.model("Payment", paymentSchema);
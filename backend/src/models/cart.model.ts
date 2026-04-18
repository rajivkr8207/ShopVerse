import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICartItem {
    productId: Types.ObjectId;
    variantId: Types.ObjectId;

    name: string;   // snapshot
    image: string;  // snapshot

    size: string;
    color: string;

    price: number;          // snapshot price
    quantity: number;
    total: number;          // price * quantity
}

export interface ICart extends Document {
    userId?: Types.ObjectId;     // logged in user
    guestId?: string;            // guest user

    items: ICartItem[];

    totalAmount: number;
    totalItems: number;

    createdAt: Date;
    updatedAt: Date;
}

const cartSchema = new Schema<ICart>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            index: true,
        },

        guestId: {
            type: String,
            index: true,
        },

        items: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },

                variantId: {
                    type: Schema.Types.ObjectId,
                    ref: "ProductVariant",
                    required: true,
                },

                name: String,
                size: String,
                color: String,
                price: {
                    type: Number,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },

                total: {
                    type: Number,
                    required: true,
                },
            },
        ],
        totalItems: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

export const Cart = mongoose.model<ICart>("Cart", cartSchema);
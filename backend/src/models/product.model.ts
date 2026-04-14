import mongoose, { Schema, Document, Types } from "mongoose";

export interface IProduct extends Document {
    name: string;
    description: string;
    brand: string;
    price: number;
    discountPrice?: number;
    category: Types.ObjectId;
    images: {
        url: string;
        thumbnailUrl: string;
    }[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        brand: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        discountPrice: {
            type: Number,
        },

        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        images: [
            {
                url: {
                    type: String,
                    required: true,
                },
                thumbnailUrl: {
                    type: String,
                    required: true,
                },
            }
        ],

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Product = mongoose.model<IProduct>("Product", productSchema);
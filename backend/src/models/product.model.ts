import mongoose, { Schema, Document, Types } from "mongoose";

export interface IProduct extends Document {
    name: string;
    description: string;
    brand: string;
    category: Types.ObjectId;
    basePrice?: number;
    images: {
        url: string;
        thumbnailUrl: string;
    }[];
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const productSchema = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },

        description: {
            type: String,
            required: true,
        },

        brand: {
            type: String,
            required: true,
            index: true,
        },

        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
            index: true,
        },

        basePrice: {
            type: Number,
            min: 0,
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
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Product = mongoose.model<IProduct>("Product", productSchema);
import mongoose, { Schema, Document, Types } from "mongoose";

export interface IProduct extends Document {
    name: string;
    description: string;
    brand: string;
    price: number;
    discountPrice?: number;
    category: Types.ObjectId;
    images: string[];
    stock: number;
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

        // 🔗 FK → Category
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        // 🖼️ Max 4 images (links)
        images: {
            type: [String],
            validate: {
                validator: function (val: string[]) {
                    return val.length <= 4;
                },
                message: "Maximum 4 images allowed",
            },
        },

        stock: {
            type: Number,
            required: true,
            default: 0,
        },

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
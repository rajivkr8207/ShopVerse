import mongoose, { Schema, Document, Types } from "mongoose";

export interface IProductVariant extends Document {
    productId: Types.ObjectId;
    size: "S" | "M" | "L" | "XL" | "XXL";
    color: string;
    stock: number;
    price?: number; // override price
    sku: string;
    createdAt: Date;
    updatedAt: Date;
}

const productVariantSchema = new Schema<IProductVariant>(
    {
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        size: {
            type: String,
            enum: ["S", "M", "L", "XL", "XXL"],
            required: true,
        },

        color: {
            type: String,
            required: true,
            trim: true,
        },

        stock: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
        },

        price: {
            type: Number,
            min: 0,
        },

        sku: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

export const ProductVariant = mongoose.model<IProductVariant>(
    "ProductVariant",
    productVariantSchema
);
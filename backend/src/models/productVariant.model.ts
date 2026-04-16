import mongoose, { Schema, Document, Types } from "mongoose";

export interface IProductVariant extends Document {
    productId: Types.ObjectId;
    size: "S" | "M" | "L" | "XL" | "XXL";
    color: string;
    stock: number;
    price: number;
    discountPrice?: number;
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
            index: true,
        },

        size: {
            type: String,
            enum: ["S", "M", "L", "XL", "XXL"],
            required: true,
            index: true,
        },

        color: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            index: true,
        },

        stock: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },
        discountPrice: {
            type: Number,
            min: 0
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

productVariantSchema.index(
    { productId: 1, size: 1, color: 1 },
    { unique: true }
);

export const ProductVariant = mongoose.model<IProductVariant>(
    "ProductVariant",
    productVariantSchema
);
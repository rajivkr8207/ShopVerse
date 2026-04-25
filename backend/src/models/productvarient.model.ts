import mongoose, { Schema, Document, Types } from 'mongoose';
import priceSchema from './price.schema.js';

export interface IProductVarient extends Document {
    productId: Types.ObjectId;
    seller: Types.ObjectId;
    images: {
        url: string;
        thumbnailUrl: string;
    }[];
    stock: number;
    attributes: Map<string, string>;
    price: {
        amount: number;
        currency: string;
    };
}

const productVarientSchema = new Schema<IProductVarient>({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    images: [
        {
            url: {
                type: String,
            },
            thumbnailUrl: {
                type: String,
            }
        }
    ],
    stock: {
        type: Number,
        required: true
    },
    attributes: {
        type: Map,
        of: String,
    },
    price: {
        type: priceSchema,
        required: true
    }
})

export const productVarientModel = mongoose.model<IProductVarient>("ProductVarient", productVarientSchema);

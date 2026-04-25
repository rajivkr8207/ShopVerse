import mongoose, { Schema, Document, Types } from 'mongoose';
import priceSchema from './price.schema.js';

export interface IProduct extends Document {
    title: string;
    description: string;
    seller: Types.ObjectId;
    price: {
        amount: number;
        currency: string;
    };
    images: {
        url: string;
        thumbnailUrl: string;
    }[];
    brand?: string;
    category?: string | Types.ObjectId;
}

const productSchema = new Schema<IProduct>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: priceSchema,
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
    brand: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
}, { timestamps: true })


const productModel = mongoose.model<IProduct>('product', productSchema);

export default productModel;
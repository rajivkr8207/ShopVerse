import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IProduct extends Document {
    title: string;
    description: string;
    seller: Types.ObjectId;
    price: number;
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
        type: Number,
        required: true
    },
    images: [
        {
            url: {
                type: String,
                required: true
            },
            thumbnailUrl: {
                type: String,
                required: true
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
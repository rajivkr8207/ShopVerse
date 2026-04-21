import mongoose, { Schema, Document } from 'mongoose';
import priceSchema from './price.schema.js';



export interface IProduct extends Document {
    title: string;
    description: string;
    seller: string;
    price: {
        amount: number;
        currency: string;
    };
    images: Array<{
        url: string;
    }>;
    variants: Array<{
        images: Array<{
            url: string;
        }>;
        stock: number;
        attributes: Map<string, string>;
        price?: {
            amount: number;
            currency: string;
        };
    }>;
    provider: "local" | "google";
    googleId?: string
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
                required: true
            }
        }
    ],
    variants: [
        {
            images: [
                {
                    url: {
                        type: String,
                        required: true
                    }
                }
            ],
            stock: {
                type: Number,
                default: 0
            },
            attributes: {
                type: Map,
                of: String
            },
            price: {
                type: priceSchema,
            }
        },

    ]
}, { timestamps: true })


const productModel = mongoose.model<IProduct>('product', productSchema);

export default productModel;
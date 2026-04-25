import { Types } from "mongoose";
import productModel from "../models/product.model.js";
import { productVarientModel } from "../models/productvarient.model.js";
import type { CreateVariantInput } from "../types/productVariant.types.js";




export const ProductVariants = {

    async FindProductById(productId: string, sellerId: string) {
        try {
            const product = await productModel.findOne({ _id: new Types.ObjectId(productId), seller: sellerId });
            return product;
        } catch (error: any) {
            throw new Error("Error finding product: " + error.message);
        }
    },

    async createVariant(data: CreateVariantInput) {
        try {
            const variant = await productVarientModel.create(data);
            return variant;
        } catch (error: any) {
            throw new Error("Error creating product variant: " + error.message);
        }
    },

    async updateVariant(variantId: string, data: { size?: string, color?: string, stock?: number, price?: number, discountPrice?: number, sku?: string }) {
        try {
            const variant = await productVarientModel.findByIdAndUpdate(variantId, data, { new: true });
            return variant;
        } catch (error: any) {
            throw new Error("Error updating product variant: " + error.message);
        }
    },

    async deleteVariant(variantId: string) {
        try {
            const variant = await productVarientModel.findByIdAndDelete(variantId);
            return variant;
        } catch (error: any) {
            throw new Error("Error deleting product variant: " + error.message);
        }
    },

    async FindProductsBySellerId(sellerId: string) {
        try {
            const products = await productModel.find({ seller: new Types.ObjectId(sellerId) });
            return products;
        } catch (error: any) {
            throw new Error("Error finding products: " + error.message);
        }
    }
}
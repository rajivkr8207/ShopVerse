import { ProductVariant, type IProductVariant } from "../models/productVariant.model.js";
import type { CreateVariantInput, UpdateVariantInput } from "../types/productVariant.types.js";

export const productVariantService = {
    async createVariant(data: CreateVariantInput): Promise<IProductVariant> {
        return await ProductVariant.create(data);
    },

    async getAllVariants(): Promise<IProductVariant[]> {
        return await ProductVariant.find().populate("productId");
    },

    async getVariantById(id: string): Promise<IProductVariant | null> {
        return await ProductVariant.findById(id).populate("productId");
    },

    async updateVariant(id: string, data: UpdateVariantInput): Promise<IProductVariant | null> {
        return await ProductVariant.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
    },

    async deleteVariant(id: string): Promise<IProductVariant | null> {
        return await ProductVariant.findByIdAndDelete(id);
    },
};
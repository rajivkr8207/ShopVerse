import { Product, type IProduct } from "../models/product.model.js";
import type { CreateProductInput, UpdateProductInput } from "../types/product.type.js";

export const productService = {
    async createProduct(data: CreateProductInput): Promise<IProduct> {
        return await Product.create(data);
    },

    async getAllProducts(): Promise<IProduct[]> {
        return await Product.find().populate("category");
    },

    async getProductById(id: string): Promise<IProduct | null> {
        return await Product.findById(id).populate("category");
    },

    async updateProduct(id: string, data: UpdateProductInput): Promise<IProduct | null> {
        return await Product.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
    },

    async deleteProduct(id: string): Promise<IProduct | null> {
        return await Product.findByIdAndDelete(id);
    },
};
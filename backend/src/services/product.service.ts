import { Types } from "mongoose";
import productModel from "../models/product.model.js";
import type { CreateProductInput } from "../types/product.type.js";

export const createProduct = async (data: CreateProductInput) => {
    try {
        const product = await productModel.create(data);
        return product;
    } catch (error: any) {
        throw new Error("Error creating product: " + error.message);
    }
};

export const deleteProduct = async (productId: string, userId: string) => {
    try {
        const product = await productModel.findById(productId);

        if (!product) {
            throw new Error("Product not found");
        }

        if (product.seller.toString() !== userId) {
            throw new Error("Unauthorized to delete this product");
        }

        await product.deleteOne();

        return { message: "Product deleted successfully" };
    } catch (error: any) {
        throw new Error("Error deleting product: " + error.message);
    }
};

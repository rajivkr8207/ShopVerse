import type { Request, Response } from "express";
import { productService } from "../services/product.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;

    if (!data.name || !data.price || !data.category) {
        throw new ApiError(400, "Required fields missing");
    }

    if (data.images && data.images.length > 4) {
        throw new ApiError(400, "Maximum 4 images allowed");
    }

    const product = await productService.createProduct(data);

    return res.status(201).json(
        new ApiResponse(201, product, "Product created successfully")
    );
});

export const getProducts = asyncHandler(async (_req: Request, res: Response) => {
    const products = await productService.getAllProducts();

    return res.status(200).json(
        new ApiResponse(200, products, "Products fetched successfully")
    );
});

export const getProduct = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const product = await productService.getProductById(id as string);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    return res.status(200).json(
        new ApiResponse(200, product, "Product fetched successfully")
    );
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const product = await productService.updateProduct(id as string, req.body);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    return res.status(200).json(
        new ApiResponse(200, product, "Product updated successfully")
    );
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const product = await productService.deleteProduct(id as string);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Product deleted successfully")
    );
});
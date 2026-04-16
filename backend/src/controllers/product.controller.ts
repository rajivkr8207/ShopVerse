import type { Request, Response } from "express";
import { productService } from "../services/product.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { UploadImageToImageKit } from "../services/storage.service.js";

type fileType = {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
}

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
    const { name, basePrice, description, brand, category } = req.body

    if (!name || basePrice === undefined || basePrice === null || !category) {
        throw new ApiError(400, "Required fields missing");
    }

    const numericBasePrice = Number(basePrice);
    if (isNaN(numericBasePrice)) {
        throw new ApiError(400, "Base price must be a valid number");
    }

    const images = await Promise.all((req.files as fileType[]).map(async (file: fileType) => {
        const uploadResult = await UploadImageToImageKit({ buffer: file.buffer, fileName: file.originalname, folderPath: "stinch" });
        return {
            url: uploadResult.url,
            thumbnailUrl: uploadResult.thumbnailUrl
        };
    }));
    const product = await productService.createProduct({ name, basePrice: numericBasePrice, description, brand, category, images });
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
    const data = { ...req.body };

    if (data.basePrice !== undefined) {
        data.basePrice = Number(data.basePrice);
        if (isNaN(data.basePrice)) {
            throw new ApiError(400, "Base price must be a valid number");
        }
    }

    // Handle images if any are uploaded
    if (req.files && (req.files as fileType[]).length > 0) {
        const images = await Promise.all((req.files as fileType[]).map(async (file: fileType) => {
            const uploadResult = await UploadImageToImageKit({ buffer: file.buffer, fileName: file.originalname, folderPath: "stinch" });
            return {
                url: uploadResult.url,
                thumbnailUrl: uploadResult.thumbnailUrl
            };
        }));
        data.images = images;
    }

    const product = await productService.updateProduct(id as string, data);

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
import type { Request, Response } from "express";
import { productVariantService } from "../services/productVariant.service.js";
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

export const createVariant = asyncHandler(async (req: Request, res: Response) => {
    const { productId, size, color, stock, price, discountPrice, sku } = req.body;
    const data: any = {
        productId,
        size,
        color,
        sku,
        stock: Number(stock),
        price: Number(price),
    };

    if (discountPrice !== undefined && discountPrice !== "") {
        data.discountPrice = Number(discountPrice);
    }
    const variant = await productVariantService.createVariant(data);

    return res.status(201).json(
        new ApiResponse(201, variant, "Variant created successfully")
    );
});

export const getVariants = asyncHandler(async (_req: Request, res: Response) => {
    const variants = await productVariantService.getAllVariants();

    return res.status(200).json(
        new ApiResponse(200, variants, "Variants fetched successfully")
    );
});

export const getVariant = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const variant = await productVariantService.getVariantById(id as string);

    if (!variant) {
        throw new ApiError(404, "Variant not found");
    }

    return res.status(200).json(
        new ApiResponse(200, variant, "Variant fetched successfully")
    );
});

export const updateVariant = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = { ...req.body };

    if (data.stock !== undefined) data.stock = Number(data.stock);
    if (data.price !== undefined) data.price = Number(data.price);
    if (data.discountPrice !== undefined && data.discountPrice !== "") {
        data.discountPrice = Number(data.discountPrice);
    } else if (data.discountPrice === "") {
        data.discountPrice = null;
    }
    const variant = await productVariantService.updateVariant(id as string, data);

    if (!variant) {
        throw new ApiError(404, "Variant not found");
    }

    return res.status(200).json(
        new ApiResponse(200, variant, "Variant updated successfully")
    );
});

export const deleteVariant = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const variant = await productVariantService.deleteVariant(id as string);

    if (!variant) {
        throw new ApiError(404, "Variant not found");
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Variant deleted successfully")
    );
});
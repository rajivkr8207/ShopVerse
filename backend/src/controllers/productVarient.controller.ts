import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ProductVariants } from "../services/productVarient.services.js";
import { Types } from "mongoose";
import { UploadImageToImageKit } from "../services/storage.service.js";

type fileType = {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
}

export const addvarient = asyncHandler(async (req: Request, res: Response) => {
    const { productId } = req.params as { productId: string };
    const sellerId = req?.user?.id;
    const {  stock, price } = req.body;

    const existingProduct = await ProductVariants.FindProductById(productId, sellerId);
    if (!existingProduct) {
        return res.status(404).json({ message: "Product not found" });
    }
    const files = req.files?.images as fileType[];
    if (!files || files.length === 0) {
        return res.status(400).json({
            message: "At least one product image is required",
        });
    }

    const images = await Promise.all(files.map(async (file: fileType) => {
        const uploadResult = await UploadImageToImageKit({
            buffer: file.buffer,
            fileName: `${Date.now()}-${file.originalname}`,
            folderPath: "stinch/productvarients"
        });
        return {
            url: uploadResult.url,
            thumbnailUrl: uploadResult.thumbnailUrl
        };
    }));
    const attribut = JSON.parse(req.body.attributes || "{}")
    
    const variantData = {
        productId: existingProduct._id,
        seller: new Types.ObjectId(sellerId),
        attributes: attribut,
        stock,
        images: images as { url: string, thumbnailUrl: string }[],
        price: {
            amount: price,
            currency: "INR"
        }
    };

    const variant = await ProductVariants.createVariant(variantData);
    res.status(201).json({ message: "Product variant created successfully", variant });

})
import { Types } from "mongoose";
import { createProduct } from "../services/product.service.js";
import { UploadImageToImageKit } from "../services/storage.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import type { Request, Response } from "express";


type fileType = {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
}


export const CreateProduct = asyncHandler(async (req: Request, res: Response) => {
    const { title, description, price } = req.body;
    const user = req.user;

    console.log(title, description, price, user)

    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (!title || !description || !price) {
        return res.status(400).json({
            message: "Title, description and price are required",
        });
    }

    const files = req.files as unknown as fileType[];
    if (!files || files.length === 0) {
        return res.status(400).json({
            message: "At least one product image is required",
        });
    }

    const images = await Promise.all(files.map(async (file: fileType) => {
        const uploadResult = await UploadImageToImageKit({
            buffer: file.buffer,
            fileName: file.originalname,
            folderPath: "stinch"
        });
        return {
            url: uploadResult.url,
            thumbnailUrl: uploadResult.thumbnailUrl
        };
    }));
    const product = await createProduct({
        title,
        description,
        price,
        images: images as { url: string, thumbnailUrl: string }[],
        seller: new Types.ObjectId((user as any).id as string),
    });

    return res.status(201).json(
        new ApiResponse(201, product, "Product created successfully")
    );
});
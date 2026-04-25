import { Types } from "mongoose";
import { createProduct, deleteProduct } from "../services/product.service.js";
import { UploadImageToImageKit } from "../services/storage.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import type { Request, Response } from "express";
import { ProductVariants } from "../services/productVarient.services.js";


type fileType = {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
}
type  UserType = {
    id: string;
    role: string;
}

export const CreateProduct = asyncHandler(async (req: Request, res: Response) => {
    const { title, description, price, category } = req.body;
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (!title || !description || !price) {
        return res.status(400).json({
            message: "Title, description and price are required",
        });
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
            folderPath: "stinch/products"
        });
        return {
            url: uploadResult.url,
            thumbnailUrl: uploadResult.thumbnailUrl
        };
    }));
    const product = await createProduct({
        title,
        description,
        price : {
            amount: price,
            currency: "INR"
        },
        category,
        images: images as { url: string, thumbnailUrl: string }[],
        seller: new Types.ObjectId((user as any).id as string),
    });

    return res.status(201).json(
        new ApiResponse(201, product, "Product created successfully")
    );
});


export const GetMyAllProduct = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const products = await ProductVariants.FindProductsBySellerId((user as { id: Types.ObjectId, role: string }).id.toString() as string);
    return res.status(200).json(
        new ApiResponse(200, products, "Products fetched successfully")
    );
})



export const DeleteProduct = asyncHandler(async (req: Request, res: Response) => {
    const { productId } = req.params as { productId: string };
    const user = req.user as unknown as UserType;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const product = await deleteProduct(productId, user.id);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    await ProductVariants.deleteVariant(productId);
    return res.status(200).json(
        new ApiResponse(200, null, "Product deleted successfully")
    );
});

// export const CreateVariant = asyncHandler(async (req: Request, res: Response) => {
//     const productId = req.params.productId;
//     const { size, color, stock, price, discountPrice, sku } = req.body;

//     const product = await ProductVariants.FindProductById(productId, (req.user as { id: Types.ObjectId, role: string })._id.toString() as string);

//     if (!product) {
//         return res.status(404).json({
//             message: "Product not found",
//             success: false
//         })
//     }

//     const user = req.user;
//     if (!user) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }
//     const files = req.files?.images as unknown as fileType[];
//     if (!files || files.length === 0) {
//         return res.status(400).json({
//             message: "At least one product image is required",
//         });
//     }

//     const images = await Promise.all(files.map(async (file: fileType) => {
//         const uploadResult = await UploadImageToImageKit({
//             buffer: file.buffer,
//             fileName: `${Date.now()}-${file.originalname}`,
//             folderPath: "stinch/products"
//         });
//         return {
//             url: uploadResult.url,
//             thumbnailUrl: uploadResult.thumbnailUrl
//         };
//     }));
   
//     const variant = await createProductVariant({
//         productId,
//         size,
//         color,
//         stock,
//         price,
//         discountPrice,
//         sku,
//         seller: new Types.ObjectId((user as any).id as string),
//     });

//     return res.status(201).json(
//         new ApiResponse(201, variant, "Variant created successfully")
//     );
// });
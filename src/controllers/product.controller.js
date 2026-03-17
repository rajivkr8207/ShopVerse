import Categorymodel from "../models/category.model.js";
import Productmodel from "../models/product.model.js";
import { uploadImage } from "../services/cloudinary.service.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";




export const createProduct = asyncHandler(async (req, res) => {
    const { title, description, price, stock, categoryId } = req.body;
    const sellerId = req.user.id;

    const category = await Categorymodel.findById(categoryId);
    if (!category || !category.isActive) {
        throw new ApiError(400, "Invalid category");
    }

    if (!req.files || req.files.length === 0) {
        throw new ApiError(400, "At least one image is required");
    }

    if (req.files.length > 3) {
        throw new ApiError(400, "Maximum 3 images allowed");
    }

    const images = [];

    for (const file of req.files) {
        const uploaded = await uploadImage(file.buffer);
        images.push({
            url: uploaded.url,
            public_id: uploaded.filePath
        });
    }

    const product = await Productmodel.create({
        sellerId,
        title,
        description,
        price,
        stock,
        categoryId,
        images,
        thumbnail: images[0].url
    });

    return res.status(201).json(
        new ApiResponse(201, product, "Product created successfully")
    );
});

export const getProducts = asyncHandler(async (req, res) => {
    let { page = 1, limit = 10, search = "" } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const skip = (page - 1) * limit;

    const query = {
        isActive: true,
        ...(search && {
            $or: [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ]
        })
    };

    const [products, total] = await Promise.all([
        Productmodel.find(query)
            .populate("categoryId", "name")
            .populate("sellerId", "name email")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),

        Productmodel.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limit);

    return res.status(200).json(
        new ApiResponse(200, {
            products,
            pagination: {
                total,
                page,
                limit,
                totalPages,
            }
        })
    );
});



// 🔥 UPDATE PRODUCT (NO IMAGE CHANGE)
export const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const sellerId = req.user.id;

    const { title, description, price, stock, categoryId, isActive } = req.body;

    const product = await Productmodel.findById(id);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    // ✅ owner check
    if (product.sellerId.toString() !== sellerId) {
        throw new ApiError(403, "Not allowed to update this product");
    }

    // ✅ category validation (if updating)
    if (categoryId) {
        const category = await Categorymodel.findById(categoryId);

        if (!category || !category.isActive) {
            throw new ApiError(400, "Invalid category");
        }

        product.categoryId = categoryId;
    }

    // ✅ update fields
    if (title) product.title = title;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (stock !== undefined) product.stock = stock;
    if (isActive !== undefined) product.isActive = isActive;

    await product.save();

    return res.status(200).json(
        new ApiResponse(200, product, "Product updated successfully")
    );
});


export const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const sellerId = req.user.id;

    const product = await Productmodel.findById(id);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    if (product.sellerId.toString() !== sellerId) {
        throw new ApiError(403, "Not allowed to delete this product");
    }

    product.isActive = false;
    await product.save();

    return res.status(200).json(
        new ApiResponse(200, null, "Product deleted successfully")
    );
});
import express from "express";
import {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/product.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { isSeller } from "../middlewares/isSeller.middleware.js";
import { createProductValidator, updateProductValidator } from "../validators/product.validator.js";
import multer from 'multer'
const ProductRouter = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 1024 * 1024 * 5 }
})
ProductRouter.post("/", protect, isSeller, upload.array("images", 4), createProductValidator, createProduct);
ProductRouter.put("/:id", protect, isSeller, updateProductValidator, updateProduct);
ProductRouter.delete("/:id", protect, isSeller, deleteProduct);
ProductRouter.get("/", getProducts);
ProductRouter.get("/:id", getProduct);

export default ProductRouter;
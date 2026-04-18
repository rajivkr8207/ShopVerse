import express from "express";
import {
    createVariant,
    getVariants,
    getVariant,
    updateVariant,
    deleteVariant,
} from "../controllers/productVariant.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import {
    createVariantValidator,
    updateVariantValidator
} from "../validators/productVariant.validator.js";
import { isSeller } from "../middlewares/isSeller.middleware.js";

import multer from "multer";

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 1024 * 1024 * 5 }
});

const router = express.Router();

router.post(
    "/",
    protect,
    isSeller,
    upload.array("images", 4),
    createVariantValidator,
    createVariant
);
router.put(
    "/:id",
    protect,
    isSeller,
    upload.array("images", 4),
    updateVariantValidator,
    updateVariant
);
router.delete("/:id", protect, isSeller, deleteVariant);
router.get("/", getVariants);
router.get("/:id", getVariant);

export default router;

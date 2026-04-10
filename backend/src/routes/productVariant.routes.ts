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

const router = express.Router();

router.post(
    "/",
    protect,
    isSeller,
    createVariantValidator,
    createVariant
);
router.put(
    "/:id",
    protect,
    isSeller,
    updateVariantValidator,
    updateVariant
);
router.delete("/:id", protect, isSeller, deleteVariant);
router.get("/", getVariants);
router.get("/:id", getVariant);

export default router;

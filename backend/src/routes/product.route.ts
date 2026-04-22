import express from "express"
import { CreateProduct } from "../controllers/product.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import multer from "multer";


const ProductRouter = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
})

ProductRouter.post("/create", protect, upload.fields([{ name: "images", maxCount: 10 }]), CreateProduct);

export default ProductRouter;
import express from "express"
import { CreateProduct, DeleteProduct, GetMyAllProduct } from "../controllers/product.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import multer from "multer";


const ProductRouter = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
})

ProductRouter.post("/create", protect, upload.fields([{ name: "images", maxCount: 10 }]), CreateProduct);
ProductRouter.get("/", protect, GetMyAllProduct);
ProductRouter.delete("/:productId", protect, DeleteProduct)
export default ProductRouter;
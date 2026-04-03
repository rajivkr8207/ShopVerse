import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";
import { isSeller } from "../middlewares/seller.middleware.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";


const Productrouter = express.Router();

Productrouter.post("/", upload.array("images", 3), isAuthenticated, isSeller, createProduct)
Productrouter.get("/", isAuthenticated, getProducts)
Productrouter.put("/:id", isAuthenticated, isSeller, updateProduct)
Productrouter.delete("/:id", isAuthenticated, isSeller, deleteProduct)



export default Productrouter;
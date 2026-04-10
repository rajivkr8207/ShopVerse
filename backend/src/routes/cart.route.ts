import express from "express";
import {
    addToCart,
    getCart,
    updateCart,
    deleteCartItem,
    clearCart
} from "../controllers/cart.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import {
    addToCartValidator,
    updateCartValidator,
    deleteCartValidator
} from "../validators/cart.validator.js";

const cartRouter = express.Router();

cartRouter.post("/", protect, addToCartValidator, addToCart);
cartRouter.get("/", protect, getCart);
cartRouter.put("/:id", protect, updateCartValidator, updateCart);
cartRouter.delete("/:id", protect, deleteCartValidator, deleteCartItem);
cartRouter.delete("/clear/all", protect, clearCart);

export default cartRouter;
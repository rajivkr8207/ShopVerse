import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import { verifySeller } from "../controllers/admin.controller.js";

const adminrouter = express.Router();

adminrouter.put(
    "/verify-seller/:sellerId",
    isAuthenticated,
    isAdmin,
    verifySeller
);

export default adminrouter;
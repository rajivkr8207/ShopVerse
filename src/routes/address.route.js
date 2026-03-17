import express from "express";

import { createAddress, deleteAddress, getAddresses, setDefaultAddress, getAddressesByid} from "../controllers/address.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { addressValidator } from "../validators/address.validator.js";

const addressrouter = express.Router();

addressrouter.post("/", isAuthenticated, addressValidator, createAddress);

addressrouter.get("/", isAuthenticated, getAddresses);
addressrouter.get("/:id", isAuthenticated, getAddressesByid);

addressrouter.delete("/:id", isAuthenticated, deleteAddress);

addressrouter.put("/default/:id", isAuthenticated, setDefaultAddress);

export default addressrouter;
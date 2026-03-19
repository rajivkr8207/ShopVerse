import jwt from "jsonwebtoken";
import config from "../config/config.js";

const DEFAULT_EXPIRES_IN = "7d";

export const generateToken = (userId, role, expiresIn = DEFAULT_EXPIRES_IN) => {
    if (!config.JWT_SECRET) {
        throw new Error("JWT_SECRET is not set");
    }

    const payload = { id: userId, role: role };
    return jwt.sign(payload, config.JWT_SECRET, { expiresIn });
};

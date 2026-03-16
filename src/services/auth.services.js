import crypto from "crypto";
import Usermodel from "../models/Usermodel.js";
import ApiError from "../utils/ApiError.js";

class AuthService {

    // create user
    async createUser(data) {

        const { fullname, email, password, phone, role = "USER" } = data;

        const user = await Usermodel.create({
            fullname,
            email,
            password,
            phone,
            role
        });

        return user;
    }

    // find user by email
    async findUserByEmail(email) {

        const user = await Usermodel.findOne({ email });

        return user;
    }

    // find user by id
    async findUserById(id) {

        const user = await Usermodel.findById(id);

        return user;
    }

    // check if user exists
    async checkUserExists(email) {
        const user = await Usermodel.findOne({ email });
        if (user) {
            throw new ApiError(409, "User already exists");
        }
        return true;
    }

    async generateVerifyToken(userId) {
        const token = crypto.randomBytes(32).toString("hex");
        const expire = Date.now() + 1000 * 60 * 60;
        await Usermodel.findByIdAndUpdate(userId, {
            verifytoken: token,
            verifytokenexpire: expire
        });

        return token;
    }

    async verifyEmail(token) {
        const user = await Usermodel.findOne({
            verifytoken: token,
            verifytokenexpire: { $gt: Date.now() }
        });
        if (!user) {
            throw new ApiError(400, "Invalid or expired token");
        }
        user.isverify = true;
        user.verifytoken = undefined;
        user.verifytokenexpire = undefined;
        await user.save();
        return user;
    }

    async generateForgotToken(email) {
        const user = await Usermodel.findOne({ email });
        if (!user) {
            throw new ApiError(404, "Usermodel not found");
        }
        const token = crypto.randomBytes(32).toString("hex");
        const expire = Date.now() + 1000 * 60 * 15;
        user.forgottoken = token;
        user.forgottokenexpire = expire;
        await user.save();
        return token;
    }

    // reset password
    async resetPassword(token, newPassword) {
        const user = await Usermodel.findOne({
            forgottoken: token,
            forgottokenexpire: { $gt: Date.now() }
        });
        if (!user) {
            throw new ApiError(400, "Invalid or expired reset token");
        }
        user.password = newPassword;
        user.forgottoken = undefined;
        user.forgottokenexpire = undefined;
        await user.save();
        return user;
    }
    async verifyEmail(token) {

        const user = await Usermodel.findOne({
            verifytoken: token,
            verifytokenexpire: { $gt: Date.now() }
        });

        if (!user) {
            throw new ApiError(400, "Invalid or expired verification token");
        }

        user.isverify = true;
        user.verifytoken = undefined;
        user.verifytokenexpire = undefined;

        await user.save();

        return user;
    }
}

export default new AuthService();
import config from "../config/config.js";
import redis from "../config/redis.js";
import authServices from "../services/auth.services.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { OAuth2Client } from "google-auth-library";
import { generateToken } from "../helpers/generateToken.js";

const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);

export const googleAuth = asyncHandler(async (req, res) => {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: config.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    const { email, name, picture } = payload;

    let user = await Usermodel.findOne({ email });

    if (user) {
        if (user.provider === "local") {
            throw new ApiError(400, "Account already exists with email/password. Please login normally.")
        }
    } else {
        user = await Usermodel.create({
            email,
            fullname: name,
            profileImage: picture,
            provider: "google",
            isverify: true
        });
    }

    const jwtToken = generateToken(user._id, user.role);

    res.cookie("token", jwtToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    });

    res.status(200).json(new ApiResponse(200, user));
});


export const registerUser = asyncHandler(async (req, res) => {

    const { fullname, email, password, phone } = req.body;

    await authServices.checkUserExists(email);

    const user = await authServices.createUser({
        fullname,
        email,
        password,
        phone
    });

    const token = await authServices.generateVerifyToken(user._id);

    return res.status(201).json(
        new ApiResponse(
            201,
            {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                verifytoken: token
            },
            "User registered successfully"
        )
    );

});


export const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    const user = await authServices.findUserByEmail(email);

    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }
    // check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new ApiError(401, "Invalid email or password");
    }

    // generate token
    const token = generateToken(user._id, user.role);

    const options = {
        httpOnly: true,
        secure: config.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    };

    res.cookie("token", token, options);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role
            },
            "Login successful"
        )
    );

});


export const verifyUser = asyncHandler(async (req, res) => {

    const { token } = req.params;

    if (!token) {
        throw new ApiError(400, "Verification token missing");
    }

    const user = await authServices.verifyEmail(token);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                id: user._id,
                email: user.email,
                isverify: user.isverify
            },
            "Email verified successfully"
        )
    );

});


export const getProfile = asyncHandler(async (req, res) => {
    const userid = req.user.id
    const user = await authServices.findUserById(userid)
    return res.status(200).json(
        new ApiResponse(
            200,
            user,
            "Profile fetched successfully"
        )
    );

});

export const getme = asyncHandler(async (req, res) => {
    const user = req.user
    console.log(user);
    return res.status(200).json(
        new ApiResponse(
            200,
            user,
            "getme fetched successfully"
        )
    );

});
export const logoutUser = asyncHandler(async (req, res) => {
    const token = req.cookies.token
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "strict",
        secure: config.NODE_ENV === "production"
    });
    const tokenExpiry = 60 * 60 * 24 * 7;
    await redis.set(token, Date.now().toString(), "EX", tokenExpiry)
    return res.status(200).json(
        new ApiResponse(200, null, "Logged out successfully")
    );

});



export const forgotPasswordRequest = asyncHandler(async (req, res) => {

    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const user = await authServices.findUserByEmail(email);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const token = crypto.randomBytes(32).toString("hex");

    const expire = Date.now() + 1000 * 60 * 15; // 15 minutes

    user.forgottoken = token;
    user.forgottokenexpire = expire;

    await user.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            { resetToken: token },
            "Password reset token generated"
        )
    );

});


export const resetPassword = asyncHandler(async (req, res) => {

    const { token } = req.params;
    const { password } = req.body;
    await authServices.resetPassword(token, password)
    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Password reset successfully"
        )
    );

});
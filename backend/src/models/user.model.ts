import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
    fullname: string;
    email: string;
    password?: string;
    contact?: string;
    role: "admin" | "seller" | "buyer";
    otp?: string;
    otpExpire?: Date;
    isVerified: boolean;
    isBlocked: boolean;
    provider: "local" | "google";
    googleId?: string
    comparePassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
    {
        fullname: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
        },
        password: {
            type: String,
            minlength: 6,
            select: false,
        },
        contact: {
            type: String,
        },
        role: {
            type: String,
            enum: ["admin", "seller", "buyer"],
            default: "buyer",
        },
        provider: {
            type: String,
            enum: ["local", "google"],
            default: "local"
        },
        googleId: {
            type: String,
            default: null
        },
        otp: {
            type: String,
            select: false,
        },
        otpExpire: {
            type: Date,
            select: false,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre<IUser>("save", async function () {
    if (!this.isModified("password")) return
    this.password = await bcrypt.hash(this.password as string, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password as string);
};

export const User = mongoose.model<IUser>("User", userSchema);

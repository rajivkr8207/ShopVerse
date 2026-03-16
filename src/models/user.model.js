import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            select: false
        },

        phone: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["ADMIN", "SELLER", "USER"],
            default: "USER"
        },

        profileImage: {
            type: String,
            default: ""
        },

        isverify: {
            type: Boolean,
            default: false
        },

        isban: {
            type: Boolean,
            default: false
        },

        verifytoken: {
            type: String
        },

        verifytokenexpire: {
            type: Date
        },

        forgottoken: {
            type: String
        },

        forgottokenexpire: {
            type: Date
        }

    },
    {
        timestamps: true
    }
);


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
});


userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}


const User = mongoose.model("User", userSchema);

export default User;
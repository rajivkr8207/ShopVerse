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
            select: false
        },

        phone: {
            type: String,
            required: function () {
                return this.provider === "local"; // only for normal signup
            }
        },

        role: {
            type: String,
            enum: ["ADMIN", "SELLER", "USER", "RIDER"],
            default: "USER"
        },
        provider: {
            type: String,
            enum: ["local", "google"]
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


userSchema.pre("save", async function () {
    if (!this.isModified("password")) return
    this.password = await bcrypt.hash(this.password, 10)
});


userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}


const Usermodel = mongoose.model("User", userSchema);

export default Usermodel;
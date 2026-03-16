import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    shopName: {
        type: String,
        required: true,
        trim: true
    },

    shopLogo: {
        type: String,
        default: ""
    },

    shopDescription: {
        type: String,
        default: ""
    },

    shopAddress: {
        type: String,
        required: true
    },

    gstNumber: {
        type: String
    },

    isVerified: {
        type: Boolean,
        default: false
    }

},
{
    timestamps: true
}
);

const Seller = mongoose.model("Seller", sellerSchema);

export default Seller;
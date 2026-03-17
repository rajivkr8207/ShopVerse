import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    title: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
        min: 0,
    },

    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },

    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },

    images: [
        {
            url: {
                type: String,
                required: true,
            },
            public_id: {
                type: String, // cloudinary / s3 key
                required: true,
            }
        }
    ],

    thumbnail: {
        type: String, // main image
    },

    isActive: {
        type: Boolean,
        default: true,
    },

}, {
    timestamps: true
});

const Productmodel = mongoose.model("Product", productSchema);
export default Productmodel;
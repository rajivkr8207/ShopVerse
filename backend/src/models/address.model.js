import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    fullName: {
        type: String,
        required: true,
        trim: true
    },

    phone: {
        type: String,
        required: true
    },

    pincode: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    addressLine1: {
        type: String,
        required: true
    },

    addressLine2: {
        type: String,
        default: ""
    },

    landmark: {
        type: String,
        default: ""
    },

    addressType: {
        type: String,
        enum: ["HOME", "WORK", "OTHER"],
        default: "HOME"
    },

    isDefault: {
        type: Boolean,
        default: false
    }

},
{
    timestamps: true
}
);

const Addressmodel = mongoose.model("Address", addressSchema);

export default Addressmodel;
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    slug: {
        type: String,
        unique: true,
        lowercase: true,
    },

    description: {
        type: String,
        default: "",
    },

    isActive: {
        type: Boolean,
        default: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
}, {
    timestamps: true
});

categorySchema.pre("save", function () {
    if (!this.isModified("name")) return

    this.slug = this.name
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");

});

const Categorymodel = mongoose.model("Category", categorySchema);
export default Categorymodel;
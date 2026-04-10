import mongoose, { Schema } from "mongoose";
import type { ICategory } from "../types/category.type.js";




const categorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
})

export const Category = mongoose.model<ICategory>("Category", categorySchema);

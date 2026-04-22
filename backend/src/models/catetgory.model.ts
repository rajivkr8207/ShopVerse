import mongoose, { Document, Schema, Types } from "mongoose";

interface ICategory extends Document {
    name: string;
    description?: string;
    seller: Types.ObjectId;
}


const CategorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })


const CategoryModel = mongoose.model('Category', CategorySchema);

export default CategoryModel
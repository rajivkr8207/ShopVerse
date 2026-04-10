import type { Document } from "mongoose";

export interface ICategory extends Document {
    name: string;
    slug: string;
    description: string;
}
export interface CreateCategoryInput {
    name: string;
    slug: string;
    description: string;
}

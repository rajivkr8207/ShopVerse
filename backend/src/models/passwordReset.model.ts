import mongoose, { Schema, Document } from "mongoose";

export interface IPasswordReset extends Document {
    userId: mongoose.Types.ObjectId;
    token: string;
    createdAt: Date;
}

// Token expires after 15 minutes (900 seconds)
const passwordResetSchema = new Schema<IPasswordReset>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 900 } 
});

export const PasswordReset = mongoose.model<IPasswordReset>("PasswordReset", passwordResetSchema);

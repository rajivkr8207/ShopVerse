import dotenv from "dotenv";
dotenv.config()


type Config = {
    readonly PORT: number;
    readonly MONGODB_URI: string;
    readonly JWT_SECRET: string;
    readonly JWT_EXPIRES_IN: string;
    readonly NODE_ENV: string;
    readonly SMTP_HOST?: string;
    readonly SMTP_USER?: string;
    readonly SMTP_PASS?: string;
    readonly FROM_EMAIL?: string;
    readonly FRONTEND_URL?: string;
    readonly REDIS_HOST?: string;
    readonly REDIS_PORT?: string;
    readonly REDIS_PASSWORD?: string;
}

export const config: Config = {
    PORT: parseInt(process.env.PORT || "3000", 10),
    MONGODB_URI: process.env.MONGODB_URI!,
    JWT_SECRET: process.env.JWT_SECRET!,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
    NODE_ENV: process.env.NODE_ENV || "development",
    SMTP_HOST: process.env.SMTP_HOST || "smtp.mailtrap.io",
    SMTP_USER: process.env.SMTP_USER || "",
    SMTP_PASS: process.env.SMTP_PASS || "",
    FROM_EMAIL: process.env.FROM_EMAIL || "noreply@snitch.com",
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
    REDIS_HOST: process.env.REDIS_HOST || "localhost",
    REDIS_PORT: process.env.REDIS_PORT || "6379",
    REDIS_PASSWORD: process.env.REDIS_PASSWORD || "",
}
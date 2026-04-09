import mongoose from "mongoose";
import { config } from "./config.js";


export const ConnectDB = () => {
    mongoose.connect(config.MONGODB_URI)
        .then(() => {
            console.log("Database connected successfully")
        }).catch((err) => {
            console.log(err)
            process.exit(1)
        })
}
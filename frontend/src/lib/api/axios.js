import { Config } from "../config";
import axios from "axios";

const api = axios.create({
    baseURL: `${Config.API_URL}`,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
import { Redis } from "ioredis";
import { config } from "./config.js";

const redis = new Redis({
    host: config.REDIS_HOST || "127.0.0.1",
    port: parseInt(config.REDIS_PORT as string, 10) || 6379,
    password: config.REDIS_PASSWORD || undefined,
    maxRetriesPerRequest: null,
})
// 
redis.on("connect", () => {
    console.log(`server is connected to redis`);
})

redis.on('error', (err: any) => {
    console.log(err);
})


export default redis;
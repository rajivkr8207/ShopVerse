import { Redis } from "ioredis";
import { config } from "./config.js";

const redis = new Redis({
    host: config.REDIS_HOST,
    port: parseInt(config.REDIS_PORT as string, 10),
    password: config.REDIS_PASSWORD,
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
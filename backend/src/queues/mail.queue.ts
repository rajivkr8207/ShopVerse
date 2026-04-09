import { Queue } from "bullmq";
import redis from "../config/redis.js";

export const mailQueue = new Queue("mailQueue", {
  connection: redis
});

export const failMailQueue = new Queue("failMailQueue", {
  connection: redis
});
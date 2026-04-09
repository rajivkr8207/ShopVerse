import { Job, Worker } from "bullmq";
import redis from "../config/redis.js";
import mailHandlers from "../handlers/mail.handlers.js";
type MailJobData = Record<string, any>;

const failMailWorker = new Worker<MailJobData>(
    "failMailQueue",
    async (job: Job<MailJobData>) => {

        const handler = mailHandlers[job.name as keyof typeof mailHandlers];

        if (!handler) {
            throw new Error("handler not found");
        }

        return handler(job.data as MailJobData[typeof job.name]);
    },
    {
        connection: redis
    }
);

failMailWorker.on("failed", (job: Job<MailJobData> | undefined, err: Error) => {
    console.error("Final mail failure:", err.message);
    job?.remove();
});
export default failMailWorker;
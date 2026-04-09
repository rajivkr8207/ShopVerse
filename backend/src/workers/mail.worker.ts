import { Worker, Job } from 'bullmq';
import mailHandlers from '../handlers/mail.handlers.js';
import redis from '../config/redis.js';
import { failMailQueue } from '../queues/mail.queue.js';

// Define type for job data (you can expand this)
type MailJobData = Record<string, any>;

const mailWorker = new Worker<MailJobData>(
  'mailQueue',
  async (job: Job<MailJobData>) => {

    const { email, name, otp } = job.data
    console.log('Job received:', job.name, job.data);

    const handler = mailHandlers.verifyMail({ email, name, otp });

    if (!handler) {
      throw new Error(`No handler found for job: ${job.name}`);
    }
    return handler;
  },
  {
    connection: redis,
    concurrency: 10,
  }
);

// Events
mailWorker.on('ready', () => {
  console.log('Mail worker ready');
});

mailWorker.on('active', (job: Job) => {
  console.log('Processing job:', job.name);
});

mailWorker.on('completed', (job: Job) => {
  console.log(`Mail job ${job.name} completed`);
});

mailWorker.on('failed', async (job: Job | undefined, err: Error) => {
  console.error(`Mail job ${job?.name} failed: ${err.message}`);

  if (job && job.attemptsMade >= 2) {
    await failMailQueue.add(job.name, job.data, {
      attempts: 1,
      removeOnComplete: true,
    });
  }
});

mailWorker.on('error', (err: Error) => {
  console.error('Worker error:', err);
});

export default mailWorker;
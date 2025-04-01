import { Worker, Job } from 'bullmq';
import IORedis from 'ioredis';
import { cacheService } from "./services/cacheService";
import { publishService } from "./services/publishService";
import {logger} from "./Logger";

const connection = new IORedis({
    maxRetriesPerRequest: null,
    host: process.env.REDIS_HOST || 'localhost',
    username: process.env.REDIS_USER,
    password: process.env.REDIS_USER_PASSWORD,
});

const PROCESS_IDS_QUEUE = 'PROCESS_IDS_QUEUE';
const PROCESSING_COMPLETED = 'PROCESSING_COMPLETED';

const getProcessMessage = (id: number) => `Handled ${id} for a new ID.`
const getCachedMessage = (id: number) => `Handled from cache ${id}.`
const printMessage = (message: string) => logger.log(message)

const worker = new Worker(PROCESS_IDS_QUEUE, async (job: Job) => {
    const id = job?.data?.id;
    const cachedValue = await cacheService.getSet(id, id);
    const message = cachedValue ? getCachedMessage(id) : getProcessMessage(id);
    printMessage(message);
    return id;
}, {connection});

worker.on('completed', (job, result) => {
    logger.log(`Publish result:`, result);
    publishService.publish(PROCESSING_COMPLETED, result);
});

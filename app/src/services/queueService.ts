import { Queue } from 'bullmq';
import {RedisService} from "./RedisService";
import {logger} from "./Logger";

const PROCESS_IDS_QUEUE = 'PROCESS_IDS_QUEUE';

class QueueService extends RedisService {
    public processIdsQueue: Queue;

    constructor() {
      super();
      this.processIdsQueue = new Queue(PROCESS_IDS_QUEUE, { connection: this.connection });
    }

    public async addBulk(queue: Queue, message: string, data: any): Promise<string> {
        try {
            const bulkData = (data?.ids || []).map((id: number) => ({name: message, data: {id}}));
            await queue.addBulk(bulkData);
            logger.log('Job added to queue');
            return 'success'
        } catch(e){
            logger.error(`Error adding bulk: ${e}`);
        }
    }
}

export const queueService = new QueueService();


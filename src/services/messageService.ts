import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';

const PROCESS_IDS_QUEUE = 'PROCESS_IDS_QUEUE';

class MessageService {
    public connection: IORedis;
    public processIdsQueue: Queue;

    constructor() {
        this.connection = new IORedis();
        this.processIdsQueue = new Queue(PROCESS_IDS_QUEUE, { connection: this.connection });
    }

    public async addMessage(queue: Queue, message = 'Default message'): Promise<string> {
        await queue.add(message, { color: 'red' });
        return 'success'
    }


}

export const messageService = new MessageService();


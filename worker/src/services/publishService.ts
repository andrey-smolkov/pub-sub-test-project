import IORedis from 'ioredis';
import { RedisService } from "./RedisService";
import {logger} from "../Logger";

class PublishService extends RedisService {
    private readonly publisher: IORedis;

    constructor() {
        super();
        this.publisher = this.connection;
    }

    async publish(channel: string, message: string): Promise<void> {
        try {
            await this.publisher.publish(channel, JSON.stringify(message));
            logger.log(`publish channel: ${channel}`);
        } catch (e) {
            logger.error(`PubSubService.publish error: ${e}`);
        }
    }
}

export const publishService = new PublishService();

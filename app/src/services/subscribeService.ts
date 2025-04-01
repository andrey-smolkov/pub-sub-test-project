import IORedis from 'ioredis';
import {RedisService} from "./RedisService";
import {logger} from "./Logger";

export enum Events {
    PROCESSING_COMPLETED = 'PROCESSING_COMPLETED'
}

class SubscribeService extends RedisService {
    private readonly subscriber: IORedis;

    constructor() {
        super()
        this.subscriber = this.connection
    }

    async subscribe(event: Events, callback: (message: string) => void): Promise<void> {
        try {
            await this.subscriber.subscribe(event);
            this.subscriber.on('message', (channel, message) => {
                logger.log(`Process event: ${channel}, channel: ${message}`);
                if (channel === event) {
                    callback(message);
                }
            });
        } catch (e) {
            logger.log(`PubSubService.subscribe error: ${e}`);
        }
    }
}

export const subscribeService = new SubscribeService();

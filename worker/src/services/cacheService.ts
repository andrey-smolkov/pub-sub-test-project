import { RedisService } from "./RedisService";
import IORedis from "ioredis";
import {logger} from "../Logger";

class CacheService extends RedisService {
    private client: IORedis;

    constructor() {
        super();
        this.client = this.connection;
    }

    async get<T>(key: string): Promise<T | null> {
        const result = await this.client.get(JSON.stringify(key));
        return result ? JSON.parse(result) : null;
    }

    async set<T>(key: string, value: T, expirationInSeconds: number = 60000 * 3): Promise<string> {
        const stringKey = JSON.stringify(key);
        const stringValue = JSON.stringify(value);

        return this.client.setex(stringKey, expirationInSeconds, stringValue);
    }

    async getSet<T>(key: string, value: T): Promise<any| null> {
        try{
            const cachedValue = await this.get(key);

            if(cachedValue) return cachedValue;

            await this.set(key, value);
            return null;
        } catch(e){
            logger.error('Redis error:', e);
            return null;
        }
    }
}

export const cacheService = new CacheService();
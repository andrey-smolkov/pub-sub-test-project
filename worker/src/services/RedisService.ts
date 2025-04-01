import IORedis from 'ioredis';

export class RedisService {
    public readonly connection: IORedis;

    constructor() {
        this.connection = new IORedis({
            host: process.env.REDIS_HOST || 'localhost',
        });
    }
}



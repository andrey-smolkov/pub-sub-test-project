import IORedis from 'ioredis';

export class RedisService {
    public readonly connection: IORedis;

    constructor() {
        console.log(process.env.REDIS_USER)
        console.log(process.env.REDIS_USER_PASSWORD)
        this.connection = new IORedis({
            host: process.env.REDIS_HOST || 'localhost',
            username: process.env.REDIS_USER,
            password: process.env.REDIS_USER_PASSWORD,
        });
    }
}



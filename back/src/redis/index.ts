import Redis from 'ioredis';

export const redis = new Redis({
    host: "localhost",
    port: 6379
});

// Get a value by key
export async function getCache(key: string) {
    const value = await redis.smembers(key);
    return value;
}

export async function setCache(key: string, words: string[]) {
    // Store the list of words as a Redis set (unique, no duplicates)
    await redis.sadd(key, ...words);
    console.log(`Words stored in cache under key: ${key}`);
}
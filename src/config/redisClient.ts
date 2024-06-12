import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redisUrl = process.env.UPSTASH_REDIS_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!redisUrl || !redisToken) {
  throw new Error('Redis URL and Token must be provided in the .env file');
}

const redisClient = new Redis({
  host: redisUrl,
  port: 6379, // Default Redis port, or 443 for SSL
  password: redisToken,
  tls: {
    rejectUnauthorized: false,
  }, 
});

// Testing Dev env

// const redisClient = new Redis({
//     host: 'localhost',
//     port: 6379, // Default Redis port, or 443 for SSL
//   });

redisClient.on('error', (err) => {
  console.error('Redis client error:', err);
});

redisClient.on('connect', () => {
    console.log('Connected to Redis');
  });

export default redisClient;

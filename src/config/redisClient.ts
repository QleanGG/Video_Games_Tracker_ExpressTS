import Redis from "ioredis";
import dotenv from "dotenv";
import logger from "./logger";

dotenv.config();

const redisUrl = process.env.UPSTASH_REDIS_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!redisUrl || !redisToken) {
	throw new Error("Redis URL and Token must be provided in the .env file");
}

const redisClient = new Redis({
	host: redisUrl,
	port: 6379, // Default Redis port, or 443 for SSL
	password: redisToken,
	tls: {
		rejectUnauthorized: false,
	},
	retryStrategy(times) {
		// Retry strategy to reconnect to Redis
		const delay = Math.min(times * 50, 2000);
		return delay;
	},
});

redisClient.on("error", (err) => {
	console.error("Redis client error:", err);
  logger.error('Redis client error:', err);
});

redisClient.on("connect", () => {
  logger.info('Connected to Redis');
	console.log("Connected to Redis");
});


redisClient.on('end', () => {
  console.warn('Redis connection closed');
});

export default redisClient;

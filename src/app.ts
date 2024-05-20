import "reflect-metadata";
import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "./config/passportConfig";
import routes from "./routes";
import flash from "connect-flash";
import RedisStore from 'connect-redis';
import redisClient from './config/redisClient';
import jsonErrorHandler from "./middleware/jsonErrorHandler";
import errorHandler from "./middleware/errorHandler";
import logger from './config/logger';
import helmet from "helmet";
import rateLimit from "express-rate-limit";


dotenv.config();

const app = express();
const SECRET_KEY = process.env.SECRET_KEY || 'defaultSecretKey';
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL || 'redis://localhost:6379';
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

if (!REDIS_URL || !REDIS_TOKEN) {
    throw new Error("Missing REDIS_URL or REDIS_TOKEN environment variables");
}

// Middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? [FRONTEND_URL] : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());
app.use(jsonErrorHandler);

// security middleware
app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
app.use(limiter);

// Logger for all incoming requests
app.use((req, res, next) => {
    logger.info(`Incoming request: ${req.method} ${req.url}`);
    next();
});

app.use(session({
    store: new RedisStore({ 
        client: redisClient,
        prefix: 'sess:',
     }),
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 2 // 2 hours
    }
}));

// app.use((req, res, next) => {
//     console.log('Session ID:', req.sessionID);
//     console.log('Session Data:', req.session);
//     next();
// });

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Routers
app.use('/api', routes);

app.get('/', (req: Request, res: Response) => {
    res.json("Hello World!");
});

app.use(errorHandler);

export default app;

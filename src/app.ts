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
import path from 'path';

dotenv.config();

const app = express();
const SECRET_KEY = process.env.SECRET_KEY || 'defaultSecretKey';
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL || 'redis://localhost:6379';
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3001';
const ALLOWED_ORIGINS = ['http://localhost:3001', 'https://gamevaultproject.vercel.app'];

if (!REDIS_URL || !REDIS_TOKEN) {
    throw new Error("Missing REDIS_URL or REDIS_TOKEN environment variables");
}

// Middleware
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || ALLOWED_ORIGINS.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// security middleware
app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again after 15 minutes',
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
        maxAge: 1000 * 60 * 60 * 2, // 2 hours
        sameSite:'none'
    }
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', FRONTEND_URL); 
    next();
  }, express.static(path.join(__dirname, '../uploads')));

// Routers
app.use('/api', routes);

app.get('/', (req: Request, res: Response) => {
    res.json("Server is live");
});

app.use(jsonErrorHandler);
app.use(errorHandler);

// Catch-all for unmatched routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

export default app;

import "reflect-metadata";
import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "./config/passportConfig"
import routes from "./routes";
import flash from "connect-flash";

dotenv.config();

const app = express();
const SECRET_KEY = process.env.SECRET_KEY || 'defaultSecretKey';

// middleware
app.use(cors());
app.use(express.json());
app.use(session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 2
    }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Routers
app.use('/api', routes);

app.get('/', (req: Request, res: Response, next) => {
    res.json("Hello World!");
});

export default app;
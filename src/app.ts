import "reflect-metadata";
import express, { Request, Response } from "express";
import cors from "cors";
import gameRoutes from './routes/GameRoutes';

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// Routers
app.get("/", (req: Request, res: Response, next) => {
    res.json("Hello World!");
});

app.use('/api', gameRoutes);


export default app;


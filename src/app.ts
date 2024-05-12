import "reflect-metadata";
import express, { Request, Response } from "express";
import { initializeDatabase } from "./database/database";
// import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3000;

//* Starting the db connection
app.get("/", (req: Request, res: Response, next) => {
	res.send("Hello World!");
});

// Starting db and port
initializeDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch(error => {
    console.error('Failed to start due to database initialization errors:', error);
});
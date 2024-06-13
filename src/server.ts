import { initializeDatabase } from "./database/database";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

// Starting db and port
initializeDatabase().then(() => {
    const PORT = process.env.SERVER_PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
        console.log(`we are on ${process.env.NODE_ENV}`)
    });
}).catch(error => {
    console.error('Failed to start due to database initialization errors:', error);
});
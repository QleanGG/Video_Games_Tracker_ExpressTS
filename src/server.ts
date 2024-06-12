import { initializeDatabase } from "./database/database";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

// Starting db and port
initializeDatabase().then(() => {
    const PORT = process.env.SERVER_PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
}).catch(error => {
    console.error('Failed to start due to database initialization errors:', error);
});
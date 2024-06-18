import { initializeDatabase } from "./database/database";
import app from "./app";
import dotenv from "dotenv";
import redisClient from "./config/redisClient";

dotenv.config();

const startServer = async () => {
	try {
		await initializeDatabase();
		const PORT = process.env.SERVER_PORT || 3000;

		// Ensure Redis client is ready before starting the server
		redisClient.on("ready", () => {
			app.listen(PORT, () => {
				console.log(`Server running on ${PORT}`);
				console.log(`We are on ${process.env.NODE_ENV}`);
			});
		});

		redisClient.on("error", (err) => {
			console.error("Redis client error:", err);
			console.log("Starting server without Redis...");
			app.listen(PORT, () => {
				console.log(`Server running on ${PORT}`);
				console.log(`We are on ${process.env.NODE_ENV}`);
			});
		});
	} catch (error) {
		console.error("Failed to start due to database initialization errors:", error);
	}
};

startServer();

import "reflect-metadata";
import { create } from 'typeorm';

export const connectDatabase = async () => {
    try {
        await createConnection({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "your_username",
            password: "your_password",
            database: "your_database_name",
            entities: [
                __dirname + "/entities/*.ts"
            ],
            synchronize: true,  // Consider using migrations in production
            logging: false
        });
        console.log("Database connected successfully.");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);  // Optional: exit application on DB connection failure
    }
};

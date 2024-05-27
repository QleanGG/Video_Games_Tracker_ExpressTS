import "reflect-metadata";
import { DataSource } from 'typeorm';
import path from 'path';
import ormconfig from './ormconfig'

// const configPath = path.join(__dirname, 'ormconfig.ts');
export const AppDataSource = new DataSource(ormconfig);

export const initializeDatabase = () => {
    return AppDataSource.initialize()
        .then(() => {
            console.log("Database connected successfully.");
        })
        .catch((error) => {
            console.error("Failed to connect to the database:", error);
            throw error;  // Re-throw to handle it in app.ts
        });
}

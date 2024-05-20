// ormconfig.ts
import { DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const config: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10), // Ensure the default value is a string
    username: process.env.DB_USERNAME || 'nodejs',
    password: process.env.DB_PASSWORD || '123',
    database: process.env.DB_NAME || 'gamevault_db_dev',
    synchronize: process.env.TYPEORM_SYNC === 'true',
    logging: process.env.TYPEORM_LOGGING === 'true',
    entities: [
        'src/database/entities/**/*.ts'
    ],
    migrations: [
        'src/migration/**/*.ts'
    ],
    subscribers: [
        'src/subscriber/**/*.ts'
    ],
};

export default config;

import { DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const config: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'nodejs',
    password: process.env.DB_PASSWORD || '123',
    database: process.env.DB_DATABASE || 'gamevault_db_dev',
    synchronize: process.env.TYPEORM_SYNC === 'true',
    logging: process.env.TYPEORM_LOGGING === 'true',
    entities: [
        isProduction ? 'dist/database/entities/**/*.js' : 'src/database/entities/**/*.ts'
    ],
    migrations: [
        isProduction ? 'dist/migration/**/*.js' : 'src/migration/**/*.ts'
    ],
    subscribers: [
        isProduction ? 'dist/subscriber/**/*.js' : 'src/subscriber/**/*.ts'
    ],
    extra: {
        ssl: {
            rejectUnauthorized: false,
        }
    }
};

export default config;

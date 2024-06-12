import dotenv from 'dotenv';
import path from 'path';

// Determine the environment file to load based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.dev';

dotenv.config({ path: path.resolve(__dirname, `../../${envFile}`) });

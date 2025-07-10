import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Navigate to the project root from backend/src/config/
const projectRoot = path.resolve(__dirname, '../../../');
const envPath = path.join(projectRoot, '.env');

// Configure dotenv to look for .env file in the project root
const result = dotenv.config({ path: envPath, debug: true });
export const connectDB = async () => {
    try{
       await mongoose.connect(process.env.MONGO_URI);
       console.log('Database connected successfully');
    }
    catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1); // Exit the process with failure
    }
};


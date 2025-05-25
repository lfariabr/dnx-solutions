import dotenv from "dotenv";

// Load environment variables
dotenv.config();

interface Config {
    port: number;
    nodeEnv: string;
    mongodbUri: string;
    jwtSecret: string;
    redisUrl: string;
}

// Validate required environment variables
const requiredEnvVars = ['PORT', 'NODE_ENV', 'MONGODB_URI', 'JWT_SECRET', 'REDIS_URL'];
const missingEnvVars = requiredEnvVars.filter(env => !process.env[env]);

if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

const config: Config = {
    port: parseInt(process.env.PORT || '4000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    mongodbUri: process.env.MONGODB_URI || '',
    jwtSecret: process.env.JWT_SECRET || '',
    redisUrl: process.env.REDIS_URL || '',
  };
  
export default config;
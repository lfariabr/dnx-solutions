import { Request } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';

// Interface for JWT payload
interface JWTPayload {
    id: string;
    email: string;
    role: string;
}

// Get auth user from the token
export const getUser = (req: Request): JWTPayload | null => {
    // Get the tokenfrom header
    const authHeader = req.headers.authorization || '';
    
    if (!authHeader){
        return null;
    }

   // Check if the header has the Bearer format
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return null;
    }

    const token = parts[1];

    try {
        // Verify token
        const decoded = jwt.verify(token, config.jwtSecret) as JWTPayload;
        return decoded;
        // Get user from redis
        // const user = await redis.get(decoded.id);

    } catch (error) {
        return null;
    }
};

// Middleware to protect routes
export const requireAuth = (role: string = 'user') => {
    return (req: Request, res: any, next: any) => {
        const user = getUser(req);

    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if the user has the required role
    if (role && user.role !== role && user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }

    next();
    };
};

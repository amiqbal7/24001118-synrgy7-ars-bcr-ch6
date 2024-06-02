import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');

interface JwtPayload {
    id: number;
    role: string;
}

interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, 'your_secret_key') as JwtPayload;
        (req as AuthenticatedRequest).user = decoded;
        next();
    } catch (ex) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

export const authorizeSuperadmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== 'superadmin') {
        return res.status(403).json({ message: 'Access denied, only superadmin can perform this action' });
    }
    next();
};

// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');
const knex = require('../db/knexfile') // Sesuaikan path dengan lokasi file konfigurasi knex

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']; // Ambil token langsung dari header Authorization

  if (!token) {
    return res.status(401).json({ message: 'Authentication token is missing.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
    const user = await knex('users').where({ id: decoded.id }).first(); // Temukan user berdasarkan ID yang di-decode dari token

    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    req.user = { id: user.id, email: user.email };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

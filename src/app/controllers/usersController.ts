import { Request, Response, NextFunction } from 'express';
import UsersService from '../services/usersServices';
import { UsersModel } from '../../app/models/UsersModel';
const db = require('../../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


interface User extends Request {
  user?: UsersModel
  };

db();

const SALT = 10;
const JWT_SECRET = process.env.JWT_SIGNATURE_KEY || "Rahasia";


  const encryptPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, SALT);
  }

  const checkPassword = async (encryptedPassword: string, password: string): Promise<boolean> => {
    return bcrypt.compare(password, encryptedPassword);
  }

  const createToken = async (payload: any): Promise<string> => {
    return jwt.sign(payload, JWT_SECRET);
  }

  export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password, username, role } = req.body;
      const encryptedPassword = await encryptPassword(password);
  
      const user = await UsersService.createUser({ email, password: encryptedPassword, username, role });
  
      res.status(200).json({
        status: true,
        message: 'Successfully registered',
      });
    } catch (err) {
      res.status(500).json({ message: "Data tidak berhasil diinput.", error: err });
    }
  };

  export const registerAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password, username, role } = req.body;
      const encryptedPassword = await encryptPassword(password);
  
      const user = await UsersService.createUser({ email, password: encryptedPassword, username, role });
  
      res.status(200).json({
        status: true,
        message: 'Successfully registered',
      });
    } catch (err) {
      res.status(500).json({ message: "Data tidak berhasil diinput.", error: err });
    }
  };

  export const login =  async(req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const user = await UsersService.login(email);

      if (!user) {
        res.status(404).json({ message: "Email tidak ditemukan." });
        return;
      }

      const isPasswordCorrect = await checkPassword(user.password, password);

      if (!isPasswordCorrect) {
        res.status(404).json({ message: "Password salah." });
        return;
      }

      const token = await createToken({
        id: user.id,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
    })

      res.status(200).json({
        status: true,
        message: 'successfully login acoount',
        token: token,
        data: user.email,
        role: user.role
      });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  export const whoami = async(req: User, res: Response): Promise<void> => {
    res.status(200).json({
      message: 'successfully get current user',
      data: req.user
    });
  }

  export const authorize = async (req: User, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bearerToken = req.headers.authorization;
      if (!bearerToken) {
        res.status(401).json({ message: "Unauthorize" });
        return;
      }

      const token = bearerToken.split("Bearer ")[1];
      const tokenPayload = jwt.verify(token, JWT_SECRET) as any;

      req.user = await UsersService.getUserById(tokenPayload.id);
      if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      next();
    } catch (err) {
      res.status(401).json({ message: "Unauthorized" });
    }
  }

  export const authorizeSuperAdmin = async (req: User, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bearerToken = req.headers.authorization;
      if (!bearerToken) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const token = bearerToken.split("Bearer ")[1];
      const tokenPayload = jwt.verify(token, JWT_SECRET) as any;

      req.user = await UsersService.getUserById(tokenPayload.id);
      if (req.user?.role !== 'superadmin') {
        res.status(403).json({ message: "Forbidden" });
        return;
      }
      next();
    } catch (err) {
      res.status(401).json({ message: "Unauthorized" });
    }
  }

  export const authorizeAdmin = async (req: User, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bearerToken = req.headers.authorization;
      if (!bearerToken) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const token = bearerToken.split("Bearer ")[1];
      const tokenPayload = jwt.verify(token, JWT_SECRET) as any;

      req.user = await UsersService.getUserById(tokenPayload.id);
      if (req.user?.role !== 'superadmin' && req.user?.role !== 'admin') {
        res.status(403).json({ message: "Forbidden" });
        return;
      }
      next();
    } catch (err) {
      res.status(401).json({ message: "Unauthorized" });
    }
  }

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const getId: number = Number(req.params.id);
        const userDelete = await UsersService.getUserById(getId);
        res.status(200).json({
            status: true,
            message: `Successfully Delete User ${getId}`,
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err
        });
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const users = await UsersService.listUsers()
        res.status(200).json({
            status: true,
            message: `Successfully get users`,
            data: users
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err
        });
    }
};




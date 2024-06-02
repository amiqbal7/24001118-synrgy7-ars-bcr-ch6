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

  export const register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password, username } = req.body;
      const encryptedPassword = await encryptPassword(password);
  
      const user = await UsersService.createUser({ email, password: encryptedPassword, username });
  
      res.status(201).json({
        id: user.id,
        email: user.email,
        username: user.username,
        create_at: user.create_at,
        updated_at: user.updated_at,
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
        create_at: user.create_at,
        updated_at: user.updated_at,
    })

      res.status(201).json({
        id: user.id,
        email: user.email,
        token: token,
        create_at: user.create_at,
        updated_at: user.updated_at,
      });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  export const whoami = async(req: User, res: Response): Promise<void> => {
    res.status(200).json(req.user);
  }

  export const authorize = async (req: User, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bearerToken = req.headers.authorization;
      if (!bearerToken) {
        res.status(401).json({ message: "Unauthorized" });
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


 
// export const register = async (req: Request, res: Response) => {
//   try {
//     const { username, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     const data = await UsersService.createUser({ username, email, password: hashedPassword });
//     res.status(200).json({
//       status: true,
//       message: 'Successfully created user',
//       data: data
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: 'error',
//       message: err || 'Failed to create user'
//     });
//   }
// };

// export const login = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     const user = await UsersService.login(email);

//     if (!user) {
//       return res.status(401).json({
//         status: 'error',
//         message: 'Invalid email or password'
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({
//         status: 'error',
//         message: 'Invalid email or password'
//       });
//     }

//     const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

//     res.status(200).json({
//       status: true,
//       message: 'Login successfuly',
//       token: token,
//       user: { id: user.id, username: user.username, email: user.email }
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: 'error',
//       message: err || 'Failed to login'
//     });
//   }
// };


// export const getUsers = async (req: Request, res: Response) => {
//     try {
//         const users = await UsersService.listUsers();
//         res.status(200).json({
//             status: true,
//             message: 'Successfully Get Users Data',
//             data: users
//         });
//     } catch (err) {
//         res.status(500).json({
//             status: 'error',
//             message: err
//         });
//     }

// };

// export const getUserById = async (req: Request, res: Response) => {
//     try {
//         const getId: number = Number(req.params.id);
//         const users = await UsersService.getUserById(getId);
//         res.status(200).json({
//             status: true,
//             message: `Successfully Get User ${getId}`,
//             data: users 
//         });    
//     } catch (err) {
//         res.status(500).json({
//             status: 'error',
//             message: err
//         });
//     }
// }

// export const deleteUser = async (req: Request, res: Response) => {
//     try {
//         const getId: number = Number(req.params.id);
//         const userDelete = await UsersService.getUserById(getId);
//         const users = await UsersService.listUsers();
//         res.status(200).json({
//             status: true,
//             message: `Successfully Delete User ${getId}`,
//             data: users
//         })
//     } catch (err) {
//         res.status(500).json({
//             status: 'error',
//             message: err
//         });
//     }
// };




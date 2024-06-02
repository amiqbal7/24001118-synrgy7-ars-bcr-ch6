import { Request, Response } from 'express';
import AdminsService from '../services/adminsServices';
const db = require('../../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';


db();

interface User extends Request {
    user?: {
        id: number;
        role: string;
    };
}

export const deleteAdmin = async (req: User, res: Response) => {
    try {
        const getId: number = Number(req.params.id);

        const userToDelete = await AdminsService.getAdminById(getId);
        if (!userToDelete) {
            return res.status(404).json({
                status: 'error',
                message: 'Admin not found'
            });
        }

        await AdminsService.deleteAdmin(getId);

        const admins = await AdminsService.listAdmin();

        res.status(200).json({
            status: true,
            message: `Successfully deleted admin with ID ${getId}`,
            data: admins
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err
        });
    }
};

// export const register = async (req: Request, res: Response) => {
//   try {
//     const { username, email, password } = req.body;

//     // Hash password before saving
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     const data = await AdminsService.createUser({ username, email, password: hashedPassword });
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

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await AdminsService.login(email);

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    // Compare the hashed password with the incoming password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      status: true,
      message: 'Login successful',
      token: token,
      user: { id: user.id, username: user.username, email: user.email }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err
    });
  }
};


export const getAdmins = async (req: Request, res: Response) => {
    try {
        const Admins = await AdminsService.listAdmin();
        res.status(200).json({
            status: true,
            message: 'Successfully Get Admins Data',
            data: Admins
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err
        });
    }

};

export const getAdminById = async (req: Request, res: Response) => {
    try {
        const getId: number = Number(req.params.id);
        const Admins = await AdminsService.getAdminById(getId);
        res.status(200).json({
            status: true,
            message: `Successfully Get User ${getId}`,
            data: Admins 
        });    
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err
        });
    }
}

// export const deleteAdmin = async (req: Request, res: Response) => {
//     try {
        
//         const getId: number = Number(req.params.id);
//         const userDelete = await AdminsService.getAdminById(getId);
//         const admins = await AdminsService.listAdmin();
        
//         res.status(200).json({
//             status: true,
//             message: `Successfully Delete User ${getId}`,
//             data: admins
//         })
//     } catch (err) {
//         res.status(500).json({
//             status: 'error',
//             message: err
//         });
//     }
// };

export const createAdmin = async (req: Request, res: Response) => {
    try {
        const adminData = req.body;
        const admins = await AdminsService.createAdmin(adminData);

        res.status(200).json({
            status: true,
            message: 'Successfully created admin',
            data: admins
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err
        })
    }
};


import { Request, Response } from 'express';
import { UsersModel } from '../../app/models/UsersModel';
const db = require('../../db/db');

db();

export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        const data = await UsersModel.query().insert({
            username,
            email,
            password
        })

        res.status(200).json({
            status: true,
            message: 'Successfully created user',
            data: data
        } );


    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err
        });
    }

};


export const handleGetUsers = async (req: Request, res: Response) => {
    try {
        const users = await UsersModel.query().select();
        res.status(200).json({
            status: true,
            message: 'Successfully Get Users Data',
            data: users
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err
        });
    }

};

export const handleGetUserById = async (req: Request, res: Response) => {
    try {
        const getId: number = Number(req.params.id);
        const users = await UsersModel.query().findById(getId);
        res.status(200).json({
            status: true,
            message: `Successfully Get User ${getId}`,
            data: users 
        });    
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err
        });
    }
}

export const handleDeleteUser = async (req: Request, res: Response) => {
    try {
        const getId: number = Number(req.params.id);
        const userDelete = await UsersModel.query().deleteById(getId);
        const users = await UsersModel.query().select();
        res.status(200).json({
            status: true,
            message: `Successfully Delete User ${getId}`,
            data: users
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err
        });
    }
};
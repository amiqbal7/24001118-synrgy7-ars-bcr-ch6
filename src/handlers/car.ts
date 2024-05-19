import { Request, Response } from 'express';
import { CarsModel } from '../models/CarsModel'; // Sesuaikan path dengan lokasi file CarsModel.ts
import { v4 as uuidv4 } from 'uuid';
const cloudinary = require('../config/cloudinary')
import filterCars from '../utils/filter';
const db = require('../db/db');

db();

interface MulterRequest extends Request {
  file: any;
}



export const handleListCar = async (req: Request, res: Response) => {
  try {
    const cars = await CarsModel.query().select();
    res.status(200).json({
      status: true,
      message: 'OK',
      data: cars,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch cars',
    });
  }
};

export const handleDeleteCar = async (req: Request, res: Response) => {
    
    try {
        const getId: number = Number(req.params.id);
        const cars = await CarsModel.query().deleteById(Number(getId));
        const carsGet = await CarsModel.query().select();
        res.status(200).json({
            status: true,
            message: 'Successfully deleted car',
            data: carsGet,
        }); 
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to delete car'
        });
    }
};

export const handleGetCarById = async (req: Request, res: Response) => {
    
    try {
        const getId: number = Number(req.params.id);
        const cars = await CarsModel.query().findById(Number(getId)).throwIfNotFound();
        res.status(200).json({
            status: true,
            message: "OK",
            data: cars
        })

    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: "failed to find car"

        });
    }
};

export const handleEditCarById = async (req: MulterRequest, res: Response) => {
  const fileBase64 = req.file.buffer.toString("base64");
  const file = `data:${req.file.mimetype};base64,${fileBase64}`;

  cloudinary.uploader.upload(file, {
    folder: 'fsw',
    use_filename: true
  }, async (err: any, result: any) => {
    if (err) {
      return res.status(400).json({
        message: 'Failed to upload'
      });
    }

    const { name, price, year, startRent, finishRent, update_at } = req.body;

    try {
      const getId: number = Number(req.params.id);
      const newData = {
        name,
        price,
        year,
        startRent,
        finishRent,
        image_url: result.url,
        update_at
      };

      const cars = await CarsModel.query().patchAndFetchById(getId, newData);

      res.status(200).json({
        status: true,
        message: 'Successfully update car',
        data: cars
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to update car',
      });
    }
  });
};

export const handleCreateNewCar = (req: MulterRequest, res: Response) => {
  // 0. Handle upload file to cloudinary
  // 1. Get req body
  // 2. (Optional) Validate req body
  // 3. Push upcoming data into current list of cars
  // 4. Return the new created data

  const fileBase64 = req.file.buffer.toString("base64");
  const file = `data:${req.file.mimetype};base64,${fileBase64}`;

  cloudinary.uploader.upload(file, {
    folder: 'fsw',
    use_filename: true
  }, async (err: any, result: any) => {
    if (err) {
      return res.status(400).json({
        message: 'Failed to upload'
      });
    }

    const body = req.body;
    const { name, year, price, startRent, finishRent } = body || {};

    const newData = {
      name,
      year,
      price,
      startRent,
      finishRent,
      image_url: result.url,
    };

    try {

      const data = await CarsModel.query().insert(newData);

      res.status(201).json({
        status: true,
        message: 'Successfully created',
        data: data
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Error creating car',
        error: error
      });
    }
  });
};

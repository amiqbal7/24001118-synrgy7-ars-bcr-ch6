import { Request, Response } from 'express';
import CarsService from '../services/carsServices';

interface MulterRequest extends Request {
  file: Express.Multer.File;
  user: { username: string, id: number};
}

export const handleListCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const cars = await CarsService.listCars();
    res.status(200).json({
      status: true,
      message: 'Successfully Get Cars',
      data: cars,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch cars',
    });
  }
};

export const handleDeleteCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const getId: number = Number(req.params.id);
    await CarsService.deleteCar(getId);
    res.status(200).json({
      status: true,
      message: 'Successfully deleted car',
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete car'
    });
  }
};

export const handleGetCarById = async (req: Request, res: Response): Promise<void> => {
  try {
    const getId: number = Number(req.params.id);
    const car = await CarsService.getCarById(getId);
    res.status(200).json({
      status: true,
      message: "OK",
      data: car
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: "Failed to find car"
    });
  }
};

export const handleEditCarById = async (req: MulterRequest, res: Response): Promise<void> => {
  try {
    const getId: number = Number(req.params.id);
    const carData = req.body;
    const file = req.file;
    const user = req.user.username;
    // const userId = req.user.id;
    const updatedCar = await CarsService.updateCar(getId, carData, file, user);

    res.status(200).json({
      status: true,
      message: 'Successfully updated car',
      data: updatedCar
    });
  } catch (err) {
    res.status(500).json({
      status: err,
      message: 'Failed to update car',
    });
  }
};

export const handleCreateNewCar = async (req: MulterRequest, res: Response): Promise<void> => {
  try {
      const carData = req.body;
      const file = req.file;
      const user = req.user.username;
      const userId = req.user.id;

      const newCar = await CarsService.createCar(carData, file, user, userId);

      res.status(201).json({
          status: true,
          message: 'Successfully created',
          data: newCar
      });
  } catch (err) {
      res.status(500).json({
          status: err,
          message: 'Error creating car'
      });
  }
};

// CarsService.ts
import CarsRepository from '../repositories/carsRepositories';
const cloudinary = require('../../config/cloudinary') ;

class CarsService {
  async listCars(): Promise<any> {
    return CarsRepository.getAllCars();
  }

  async getCarById(id: number): Promise<any> {
    return CarsRepository.getCarById(id);
  }

  async createCar(carData: any, file: Express.Multer.File): Promise<any> {
    const fileBase64 = file.buffer.toString("base64");
    const fileData = `data:${file.mimetype};base64,${fileBase64}`;
    const result = await cloudinary.uploader.upload(fileData, {
      folder: 'fsw',
      use_filename: true
    });

    carData.image_url = result.url;
    return CarsRepository.createCar(carData);
  }

  async updateCar(id: number, carData: any, file: Express.Multer.File): Promise<any> {
    const fileBase64 = file.buffer.toString("base64");
    const fileData = `data:${file.mimetype};base64,${fileBase64}`;
    const result = await cloudinary.uploader.upload(fileData, {
      folder: 'fsw',
      use_filename: true
    });

    carData.image_url = result.url;
    return CarsRepository.updateCar(id, carData);
  }

  async deleteCar(id: number): Promise<number> {
    return CarsRepository.deleteCar(id);
  }
}

export default new CarsService();

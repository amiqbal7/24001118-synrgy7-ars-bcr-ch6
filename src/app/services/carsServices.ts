// CarsService.ts
import CarsRepository from '../repositories/carsRepositories';
const cloudinary = require('../../config/cloudinary') ;


interface CarData {
    user_id: number;
    name: string;
    availability: boolean;
    price: string;
    startRent: string;
    finishRent: string;
    image_url?: string;
    created_by: string;
    updated_by: string;
    created_at: Date;
    updated_at: Date;
}


class CarsService {
  constructor(private carRepository = CarsRepository) {}

  async updateExpiredRentDates(): Promise<void> {
    try {
      const expiredCars = await this.carRepository.findExpiredRentDates();
      const expiredCarIds = expiredCars.map(car => car.id);
      if (expiredCarIds.length > 0) {
        await this.carRepository.updateRentDatesToNull(expiredCarIds);
      }
      console.log('Expired rent dates updated to null');
    } catch (error) {
      console.error('Error updating expired rent dates:', error);
    }
  }
  async listCars(): Promise<any> {
    return CarsRepository.getAllCars();
  }

  async getCarById(id: number): Promise<any> {
    return CarsRepository.getCarById(id);
  }

  async createCar(carData: CarData, file: Express.Multer.File, adminName: string, userId: number): Promise<any> {

            const fileBase64 = file.buffer.toString('base64');
            const fileData = `data:${file.mimetype};base64,${fileBase64}`;
            const result = await cloudinary.uploader.upload(fileData, {
                folder: 'fsw',
                use_filename: true
            });

            carData.image_url = result.url;
            carData.created_by = adminName;
            carData.updated_by = adminName;
            carData.updated_at = new Date();
            carData.created_at = new Date();
            carData.user_id = userId;


            return await CarsRepository.createCar(carData);
    
    }

  async updateCar(id: number, carData: any, file: Express.Multer.File, adminName: string): Promise<any> {
    const fileBase64 = file.buffer.toString("base64");
    const fileData = `data:${file.mimetype};base64,${fileBase64}`;
    const result = await cloudinary.uploader.upload(fileData, {
      folder: 'fsw',
      use_filename: true
    });

    carData.image_url = result.url;
    carData.updated_by = adminName;
    carData.updated_at = new Date();
    // carData.user_id = userId;
    return CarsRepository.updateCar(id, carData);
  }

  async deleteCar(id: number): Promise<number> {
    return CarsRepository.deleteCar(id);
  }
}

export default new CarsService();

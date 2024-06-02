// CarsRepository.ts
import { CarsModel } from '../../app/models/CarsModel';

class CarsRepository {
  async getAllCars(): Promise<any> {
    return CarsModel.query().select();
  }

  async getCarById(id: number): Promise<any> {
    return CarsModel.query().findById(id).throwIfNotFound();
  }

  async createCar(data: any): Promise<any> {
    return CarsModel.query().insert(data);
  }

  async updateCar(id: number, data: any): Promise<any> {
    return CarsModel.query().patchAndFetchById(id, data);
  }

  async deleteCar(id: number): Promise<number> {
    return CarsModel.query().deleteById(id);
  }
}

export default new CarsRepository();

// CarsRepository.ts
import { fn } from 'objection';
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

  async findExpiredRentDates(): Promise<any[]> {
    const today = new Date();
    return CarsModel.query()
      .whereNotNull('startRent')
      .andWhere('startRent', '<', today)
      .orWhereNotNull('finishRent')
      .andWhere('finishRent', '<', today);
  }

  async updateRentDatesToNull(ids: number[]): Promise<number> {
    return CarsModel.query()
      .whereIn('id', ids)
      .patch({
        startRent: fn.coalesce(null),
        finishRent: fn.coalesce(null),
      });
  }
}

export default new CarsRepository();

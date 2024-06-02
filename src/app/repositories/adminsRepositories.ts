import { AdminsModel } from '../models/AdminsModel';

class AdminsRepository {
  async getAllAdmins(): Promise<any> {
    return AdminsModel.query().select();
  }

  async getAdminById(id: number): Promise<any> {
    return AdminsModel.query().findById(id).throwIfNotFound();
  }

  async createAdmin(data: any): Promise<any> {
    return AdminsModel.query().insert(data);
  }

  async updateAdmin(id: number, data: any): Promise<any> {
    return AdminsModel.query().patchAndFetchById(id, data);
  }

  async deleteAdmin(id: number): Promise<number> {
    return AdminsModel.query().deleteById(id);
  }

  async login(email: string): Promise<AdminsModel | undefined> {
    return AdminsModel.query().findOne({ email });
  }
}

export default new AdminsRepository();


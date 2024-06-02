// UsersRepository.ts
import { UsersModel } from '../../app/models/UsersModel';

class UsersRepository {
  async getAllUsers(): Promise<any> {
    return UsersModel.query().select();
  }

  async getUserById(id: number) {
    return UsersModel.query().findById(id);
  }

  async createUser(data: any): Promise<any> {
    return UsersModel.query().insert(data);
  }

  async updateUser(id: number, data: any): Promise<any> {
    return UsersModel.query().patchAndFetchById(id, data);
  }

  async deleteUser(id: number): Promise<number> {
    return UsersModel.query().deleteById(id);
  }

  async login(email: string): Promise<UsersModel | undefined> {
    return UsersModel.query().findOne({ email });
  }

  async whoami(email: string, username: string): Promise<any> {
    return UsersModel.query().select({ email, username})
  }
}

export default new UsersRepository();

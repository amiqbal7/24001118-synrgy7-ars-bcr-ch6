import usersRepository from "../repositories/usersRepositories";

class UsersService {
    async listUsers(): Promise<any> {
        return usersRepository.getAllUsers();
    }

    async getUserById(id: number) {
        return await usersRepository.getUserById(id);
      }

    async deleteUser(id: number): Promise<any> {
        return usersRepository.deleteUser(id);
    }

    async createUser(data: any): Promise<any> {
        return usersRepository.createUser(data);
    }

    async updateUsers(id: number, data: any): Promise<any> {
        return usersRepository.updateUser(id, data);
    }

    async login(email: string): Promise<any> {
        return usersRepository.login(email);
    }

    async whoami(email: string, username: string): Promise<any> {
        return usersRepository.whoami(email, username);
    }
}
export default new UsersService();



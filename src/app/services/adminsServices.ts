import adminsRepository from "../repositories/adminsRepositories";

class AdminsService {
    async listAdmin(): Promise<any> {
        return adminsRepository.getAllAdmins();
    }

    async getAdminById(id: number): Promise<any> {
        return adminsRepository.getAdminById(id);
    }

    async deleteAdmin(id: number): Promise<any> {
        return adminsRepository.deleteAdmin(id);
    }

    async createAdmin(data: any): Promise<any> {
        return adminsRepository.createAdmin(data);
    }

    async updateAdmin(id: number, data: any): Promise<any> {
        return adminsRepository.updateAdmin(id, data);
    }

    async login(email: string): Promise<any> {
        return adminsRepository.login(email);
    }
}
export default new AdminsService();



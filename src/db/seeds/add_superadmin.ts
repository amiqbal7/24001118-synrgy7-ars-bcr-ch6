import { Knex } from "knex";
const bcrypt = require("bcrypt");

export async function seed(knex: Knex): Promise<void> {
    const hashedPasswordSuperAdmin = await bcrypt.hash('superadmin_password', 10);
    const hashedPasswordAdmin1 = await bcrypt.hash('admin1_password', 10);

    await knex('admins').del();
    return knex('admins').insert([
        {
            id: 1,
            email: 'superadmin@example.com',
            password: hashedPasswordSuperAdmin,
            role: 'superadmin',
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: 2,
            email: 'admin1@example.com',
            password: hashedPasswordAdmin1,
            role: 'admin',
            created_at: new Date(),
            updated_at: new Date()
        }
    ]);
}

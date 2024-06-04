import { Knex } from "knex";
const bcrypt = require("bcrypt");

export async function seed(knex: Knex): Promise<void> {
    const hashedPasswordSuperAdmin = await bcrypt.hash('superadmin', 10);

    await knex('users').del();
    return knex('users').insert([
        {
            username: 'superadmin',
            email: 'superadmin@example.com',
            password: hashedPasswordSuperAdmin,
            role: 'superadmin',
            
        },
    ]);
}

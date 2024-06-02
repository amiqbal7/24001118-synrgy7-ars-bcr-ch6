import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('admins', table => {
        table.increments('id');
        table.string('email', 100).notNullable().unique();
        table.string('password', 255).notNullable();
        table.string('role', 20).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });

}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('admins');
}


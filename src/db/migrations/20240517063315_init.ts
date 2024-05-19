import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('cars', table => {
        table.increments('id');
        table.string('name', 100).notNullable();
        table.string('year', 10).notNullable();
        table.string('price', 200).notNullable();
        table.string('image_url', 255).nullable();
        table.string('startRent', 100).notNullable();
        table.string('finishRent', 100).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());

    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('cars')
}


import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('cars', table => {
        table.increments('id');
        table.integer('user_id').notNullable().references('id').inTable('users').onDelete('Cascade');
        table.string('name', 100).notNullable();
        table.boolean('availabillity').notNullable().defaultTo(false);
        table.string('price', 200).notNullable();
        table.string('image_url', 255).nullable();
        table.timestamp('startRent').notNullable();
        table.timestamp('finishRent').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());

    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('cars')
}


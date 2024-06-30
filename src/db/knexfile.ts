import type { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      host: 'aws-0-ap-southeast-1.pooler.supabase.com',
      database: 'postgres',
      user: 'postgres.pgnjiswjftksqjhdxaje',
      password: 'bolonperakE4',
      port: 6543
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    },
    seeds: {
      directory: './seeds'
  }
  }
};

module.exports = config;

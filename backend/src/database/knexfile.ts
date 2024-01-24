// Update with your config settings.

import { Knex } from "knex";
import dotenv from "dotenv";
dotenv.config();

const connections: Record<string, Knex.Config> = {
  development: {
    client: 'mysql2',
    connection: {
      host:     process.env.DB_HOST,
      port:     +(process.env.DB_PORT || 3306),
      user:     process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
  },
  production: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      port:     +(process.env.DB_PORT || 3306),
      user:     process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
  },
};

export default connections;


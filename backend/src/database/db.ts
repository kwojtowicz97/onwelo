import knex from 'knex';
import connections from './knexfile';

export const database = knex(
  connections[process.env.NODE_ENV || 'development']
);

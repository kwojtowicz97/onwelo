import { database } from '../database/db';

export const getEbooks = async () => {
  return await database('ebooks')
    .select('*')
    .leftJoin('authors', 'ebooks.artist_id', 'authors.id')
    .leftJoin('exchange_rates', 'ebooks.exchange_rate_id', 'exchange_rates.id');
};

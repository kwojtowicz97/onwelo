import { database } from '../database/db';

export const getEbooks = async (query: Record<string, unknown>) => {
  const name = query.name;
  const title = query.title;

  const priceUsd = query.priceusd;
  let priceUsdMin: undefined | string = undefined;
  let priceUsdMax: undefined | string = undefined;
  if (typeof priceUsd === 'string') {
    priceUsdMin = priceUsd.split(',')[0] || undefined;
    priceUsdMax = priceUsd.split(',')[1] || undefined;
  }

  const pricePln = query.pricepln;
  let pricePlnMin: undefined | string = undefined;
  let pricePlnMax: undefined | string = undefined;
  if (typeof pricePln === 'string') {
    pricePlnMin = pricePln.split(',')[0] || undefined;
    pricePlnMax = pricePln.split(',')[1] || undefined;
  }

  const date = query.date;
  let dateMin: undefined | string = undefined;
  let dateMax: undefined | string = undefined;
  if (typeof date === 'string') {
    const dates = date.split(',');

    dateMin = dates[0]
      ? new Date(+dates[0]).toISOString().split('T')[0]
      : undefined;
    dateMax = dates[1]
      ? new Date(+dates[1]).toISOString().split('T')[0]
      : undefined;
  }

  console.log({ dateMin, dateMax, title });

  return await database('ebooks')
    .select('*')
    .leftJoin('authors', 'ebooks.artist_id', 'authors.id')
    .leftJoin('exchange_rates', 'ebooks.exchange_rate_id', 'exchange_rates.id')
    .modify((qb) => {
      if (title) {
        qb.where('title', 'LIKE', `%${title}%`);
      }
      if (name) {
        qb.where('name', 'LIKE', `%${name}%`);
      }
      if (pricePlnMin) {
        qb.where('price_pln', '>=', pricePlnMin);
      }
      if (pricePlnMax) {
        qb.where('price_pln', '<=', pricePlnMax);
      }
      if (priceUsdMin) {
        qb.where('price_usd', '>=', priceUsdMin);
      }
      if (priceUsdMax) {
        qb.where('price_usd', '<=', priceUsdMax);
      }
      if (dateMin) {
        qb.where('ebooks.date', '>=', dateMin);
      }
      if (dateMax) {
        qb.where('ebooks.date', '<=', dateMax);
      }
    });
};

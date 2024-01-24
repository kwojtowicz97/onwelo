import { log } from 'console';
import { database } from '../database/db';
import { Ebook } from '../models/ebook';
import { SuccessResponse } from './fetchBookAndExchangeRateData';

export const saveToDatabase = async (data: SuccessResponse) => {
  let author = await database('authors')
    .where({
      apple_id: data.bookData.artistId,
    })
    .first();

  if (!author) {
    author = {
      name: data.bookData.artistName,
      apple_id: data.bookData.artistId,
    };
    const authorId = (
      await database('authors').insert(
        {
          name: data.bookData.artistName,
          apple_id: data.bookData.artistId,
        },
        '*'
      )
    )[0];
    author.id = authorId;
  }

  const existingEbook = await database('ebooks')
    .where({
      apple_id: data.bookData.trackId,
    })
    .first();

  if (existingEbook) {
    return existingEbook;
  }

  if (!data.exchangeRateData) {
    throw new Error('No exchange rate data');
  }

  log(data.exchangeRateData);

  log(
    data.bookData.price,
    data.exchangeRateData.rate,
    data.bookData.price * data.exchangeRateData.rate
  );

  const price_pln = data.bookData.price * data.exchangeRateData.rate;

  const model: Ebook = {
    artist_id: author.id,
    title: data.bookData.trackName,
    price_usd: data.bookData.price,
    price_pln,
    date: new Date(data.bookData.releaseDate),
    exchange_rate_id: data.exchangeRateData.id,
    apple_id: data.bookData.trackId,
  };

  const savedEbook = await database('ebooks').insert(model, '*');

  return savedEbook[0];
};

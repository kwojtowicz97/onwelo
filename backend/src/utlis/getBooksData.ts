import { URL, URLSearchParams } from 'url';
import { InputData } from '../dtos/inputData';
import dotenv from 'dotenv';
import { AppleApiResponse } from '../dtos/appleResponse.dto';
import { Author } from '../models/author';
import { Ebook } from '../models/ebook';

dotenv.config();

export const getBooksData = async (
  book: InputData
): Promise<{ book: Omit<Ebook, 'exchange_rate' | 'id'>; author: Author }> => {
  const baseUrl = process.env.APPLE_API!;
  const searchParams = new URLSearchParams();
  searchParams.append('term', `${book.name} ${book.title}`);
  searchParams.append('media', 'ebook');
  searchParams.append('limit', '1');
  console.log(`${baseUrl}?${searchParams.toString()}`);
  const response = await fetch(`${baseUrl}?${searchParams.toString()}`);
  if (!response.ok) {
    throw new Error('Apple API is not available');
  }

  const data: AppleApiResponse = await response.json();

  if (data.resultCount === 0) {
    throw new Error('No results');
  }

  const bookData = data.results[0];

  return {
    book: {
      date: new Date(bookData.releaseDate),
      name: book.name,
      title: book.title,
      price_usd: bookData.price,
    },
    author: { name: bookData.artistName, id: bookData.artistId },
  };
};

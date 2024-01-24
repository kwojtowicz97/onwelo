import { URLSearchParams } from 'url';
import { InputData } from '../dtos/inputData';
import dotenv from 'dotenv';
import { AppleApiResponse, Book } from '../dtos/appleResponse.dto';

dotenv.config();

export const getBooksData = async (book: InputData): Promise<Book> => {
  const baseUrl = process.env.APPLE_API;
  const searchParams = new URLSearchParams();
  searchParams.append('term', `${book.name} ${book.title}`);
  searchParams.append('media', 'ebook');
  searchParams.append('limit', '1');
  const response = await fetch(`${baseUrl}?${searchParams.toString()}`);
  if (!response.ok) {
    throw new Error('Apple API is not available');
  }

  const data: AppleApiResponse = await response.json();

  if (data.resultCount === 0) {
    throw new Error('No results');
  }

  const bookData = data.results[0];

  return bookData;
};

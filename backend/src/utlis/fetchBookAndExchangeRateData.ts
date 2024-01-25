import { Book } from '../dtos/appleResponse.dto';
import { InputData } from '../dtos/inputData';
import { ExchangeRate } from '../models/exchangeRate';
import { getBooksData } from './getBooksData';
import { getExchangeRateData } from './getExchangeRates';

export type SuccessResponse = {
  ok: true;
  bookData: Book;
  exchangeRateData: ExchangeRate | null;
};

export type ErrorResponse = {
  ok: false;
  title: string;
  author: string;
  error: string;
};

export const fetchBookAndExchangeRateData = async (
  book: InputData
): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const bookData = await getBooksData(book);
    let exchangeRateData: null | ExchangeRate = null;

    if (bookData.price !== 0) {
      exchangeRateData = await getExchangeRateData(bookData.releaseDate);
    }

    return {
      ok: true,
      bookData,
      exchangeRateData,
    };
  } catch (error: any) {
    return {
      ok: false,
      title: book.title,
      author: book.name,
      error: error.message,
    };
  }
};

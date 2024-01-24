import { InputData } from '../dtos/inputData';
import { getBooksData } from './getBooksData';
import { getExchangeRateData } from './getExchangeRates';

export const fetchBookAndExchangeRateData = async (book: InputData) => {
  try {
    const bookData = await getBooksData(book);
    const exchangeRateData = await getExchangeRateData(bookData.book.date);

    return {
      ok: true,
      bookData,
      exchangeRateData,
    };
  } catch (error: unknown) {
    return {
      ok: false,
      title: book.title,
      author: book.name,
      error: error,
    };
  }
};

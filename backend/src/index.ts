import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import { Author } from './models/author';
import multer from 'multer';
import { parseCsv } from './utlis/parseCsv';
import { getBooksData } from './utlis/getBooksData';
import { getExchangeRateData } from './utlis/getExchangeRates';
import { Ebook } from './models/ebook';
import { ResponseDto } from './dtos/response.dto';
import { database } from './database/db';

dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

database.raw('SELECT 1').then(() => {
  console.log('[database] Database is connected');
});

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', async (_req: Request, res: Response) => {
  const eboooks: Author[] = await database.table('authors').select('*');
  res.json(eboooks);
});

app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file provided' });
  }

  if (!req.file.mimetype.includes('csv')) {
    return res.status(400).json({ error: 'File is not CSV' });
  }

  const parsedEbooksInputData = await parseCsv(req.file);

  const errors: ResponseDto['errors'] = [];
  const ebooks: ResponseDto['ebooks'] = [];

  const promises = parsedEbooksInputData.map(async (book) => {
    try {
      const bookData = await getBooksData(book);
      const exchangeRateData = await getExchangeRateData(bookData.book.date);

      const price_pln = +(
        exchangeRateData.rates[0].mid * bookData.book.price_usd
      ).toFixed(2);
      const table_no = exchangeRateData.rates[0].no;
      const rate = exchangeRateData.rates[0].mid;
      ebooks.push({
        name: bookData.author.name,
        title: bookData.book.title,
        curr: 'USD',
        price: bookData.book.price_usd,
        date: bookData.book.date.toISOString(),
        fromNBP: {
          rate,
          pricePLN: price_pln,
          tableNo: table_no,
        },
      });
    } catch (error: any) {
      errors.push({
        title: book.title,
        author: book.name,
        error: error.message,
      });
    }
  });

  await Promise.all(promises);

  const response: ResponseDto = {
    errors,
    ebooks,
  };

  res.json(response);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

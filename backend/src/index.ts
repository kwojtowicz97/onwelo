import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import { Author } from './models/author';
import multer from 'multer';
import { parseCsv } from './utlis/parseCsv';
import cors from 'cors';

import { database } from './database/db';
import {
  ErrorResponse,
  SuccessResponse,
  fetchBookAndExchangeRateData,
} from './utlis/fetchBookAndExchangeRateData';
import { saveToDatabase } from './utlis/saveToDatabase';
import { ResponseDto } from './dtos/response.dto';
import { getEbooks } from './utlis/getEbooks';
import { Ebook } from './models/ebook';
import { ExchangeRate } from './models/exchangeRate';

dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

database.raw('SELECT 1').then(() => {
  console.log('[database] Database is connected');
});

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/ebooks', async (req: Request, res: Response) => {
  const eboooks: (Ebook & Author & ExchangeRate)[] = await getEbooks(req.query);
  const response: ResponseDto['ebooks'] = eboooks.map((ebook) => ({
    title: ebook.title,
    name: ebook.name,
    price: ebook.price_usd,
    curr: ebook.currency,
    date: ebook.date.toISOString(),
    fromNBP: {
      pricePLN: ebook.price_pln,
      rate: ebook.rate,
      tableNo: ebook.table_no,
    },
  }));
  res.json(response);
});

app.post('/ebooks', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file provided' });
  }

  if (!req.file.mimetype.includes('csv')) {
    return res.status(400).json({ error: 'File is not CSV' });
  }

  const parsedEbooksInputData = await parseCsv(req.file);

  const promises = parsedEbooksInputData.map((book) =>
    fetchBookAndExchangeRateData(book)
  );

  const results = await Promise.all(promises);

  const errors = results.filter((result) => !result.ok) as ErrorResponse[];
  const ebooks = results.filter((result) => result.ok) as SuccessResponse[];

  for (const ebook of ebooks) {
    await saveToDatabase(ebook);
  }

  const response: ResponseDto = {
    errors,
    ebooks: ebooks.map((ebook) => ({
      name: ebook.bookData.artistName,
      title: ebook.bookData.trackName,
      curr: ebook.bookData.currency,
      price: ebook.bookData.price,
      date: ebook.bookData.releaseDate,
      fromNBP: {
        rate: ebook.exchangeRateData.rate,
        pricePLN: ebook.exchangeRateData.rate * ebook.bookData.price,
        tableNo: ebook.exchangeRateData.table_no,
      },
    })),
  };

  res.json(response);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import { Author } from './models/author';
import multer from 'multer';
import { parseCsv } from './utlis/parseCsv';

import { database } from './database/db';
import { fetchBookAndExchangeRateData } from './utlis/fetchBookAndExchangeRateData';

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

  const promises = parsedEbooksInputData.map((book) =>
    fetchBookAndExchangeRateData(book)
  );

  const results = await Promise.all(promises);

  const errors = results.filter((result) => !result.ok);
  const ebooks = results.filter((result) => result.ok);

  res.json({ errors, ebooks });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

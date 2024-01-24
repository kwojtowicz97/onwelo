import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import knex from 'knex';
import connections from './database/knexfile';
import { Author } from './types/author';
import multer from 'multer';
import { parseCsv } from './utlis/parseCsv';
import { getBooksData } from './utlis/getBooksData';

dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const database = knex(connections[process.env.NODE_ENV || 'development']);

database.raw('SELECT 1').then(() => {
  console.log('[database] Database is connected');
});

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', async (req: Request, res: Response) => {
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

  const books = await parseCsv(req.file);

  books.forEach(async (book) => {
    try {
      console.log(await getBooksData(book));
    } catch (error) {
      console.log;
    }
  });

  res.json(books);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

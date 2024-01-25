import { Stream } from 'stream';
import { parse } from 'csv-parse';
import { InputData } from '../dtos/inputData';

const mapData = (data: string[][]): InputData[] => {
  return data.map((row) => {
    return {
      name: row[0],
      title: row[1],
    };
  });
};

export const parseCsv = (file: Express.Multer.File) => {
  return new Promise<InputData[]>((resolve, reject) => {
    const csvContent = file.buffer.toString('utf8');
    const results: string[][] = [];

    Stream.Readable.from(csvContent)
      .pipe(parse({ delimiter: ',', quote: '"' }))
      .on('data', (data: string[]) => {
        if (data.length !== 2) {
          return reject(
            new Error('CSV file must only have "author" and title "columns".')
          );
        }
        results.push(data);
      })
      .on('end', () => resolve(mapData(results)))
      .on('error', (error: unknown) => reject(error));
  });
};

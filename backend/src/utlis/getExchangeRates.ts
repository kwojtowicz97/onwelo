import dotenv from 'dotenv';
import { NbpApiResponse } from '../dtos/nbpResponse.dto';

dotenv.config();

export const getExchangeRateData = async (date: Date) => {
  const clonedDate = new Date(date);

  const day = clonedDate.getDay();

  if (day === 0 || day === 6) {
    const daysToSubtract = day === 6 ? 1 : 2;
    clonedDate.setDate(clonedDate.getDate() - daysToSubtract);
  }

  const baseUrl = process.env.NBP_API!;
  const response = await fetch(
    baseUrl + clonedDate.toISOString().split('T')[0] + '/?format=json'
  );

  if (response.status === 404) {
    throw new Error('No results');
  }

  if (!response.ok) {
    throw new Error('NBP API is not available');
  }
  const data: NbpApiResponse = await response.json();

  return data;
};

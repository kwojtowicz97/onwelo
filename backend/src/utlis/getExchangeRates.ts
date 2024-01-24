import dotenv from 'dotenv';
import { NbpApiResponse } from '../types/nbpResponse.dto';

dotenv.config();

export const getExchangeRateData = async (date: Date) => {
  const baseUrl = process.env.NBP_API!;
  const response = await fetch(
    baseUrl + date.toISOString().split('T')[0] + '/?format=json'
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

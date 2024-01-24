import dotenv from 'dotenv';
import { NbpApiResponse } from '../dtos/nbpResponse.dto';
import { database } from '../database/db';
import { ExchangeRate } from '../models/exchangeRate';

dotenv.config();

export const getExchangeRateData = async (
  date: string
): Promise<ExchangeRate> => {
  const clonedDate = new Date(date);

  const day = clonedDate.getDay();

  if (day === 0 || day === 6) {
    const daysToSubtract = day === 6 ? 1 : 2;
    clonedDate.setDate(clonedDate.getDate() - daysToSubtract);
  }

  const savedExchangeRate = await database('exchange_rates')
    .select('*')
    .where({
      date: clonedDate.toISOString().split('T')[0],
    })
    .first();

  if (savedExchangeRate) {
    return savedExchangeRate;
  }

  const baseUrl = process.env.NBP_API;
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

  const model: Omit<ExchangeRate, 'id'> = {
    date: clonedDate,
    rate: data.rates[0].mid,
    table_no: data.rates[0].no,
  };

  const savedModelId = (await database('exchange_rates').insert(model))[0];

  return {
    ...model,
    id: savedModelId,
  };
};

export type Ebook = {
  id?: number;
  apple_id: number;
  artist_id: number;
  title: string;
  currency: string;
  price_usd: number;
  price_pln: number;
  relase_date: Date;
  exchange_rate_id: number | null;
};

export type NbpApiResponse = {
  table: string;
  country: string;
  symbol: string;
  code: string;
  rates: {
    no: string;
    effectiveDate: string;
    mid: number;
  }[];
};

import { ExchangeRate } from "./exchangeRate"

export type Ebook = {
    id: number,
    name: string
    title: string
    price_usd: number
    date: Date
    exchange_rate: ExchangeRate
}
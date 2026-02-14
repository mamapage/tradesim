
export interface WatchlistItem {
  id: string;
  symbol: string;
  spotPrice: number;
  nearMonthFuture: number;
  nextMonthFuture: number;
  lotSize: number;
  futurePriceDifference: number;
}

export type SortableKey = keyof Omit<WatchlistItem, 'id'>;

export interface SortConfig {
  key: SortableKey;
  direction: 'ascending' | 'descending';
}

export enum Broker {
  Zerodha = 'Zerodha',
  Upstox = 'Upstox',
  AngelOne = 'Angel One',
  Dhan = 'Dhan',
  Fyers = 'Fyers',
}

export interface Position {
  id: string;
  symbol: string;
  quantity: number;
  avgPrice: number;
  ltp: number;
  pnl: number;
}

export interface Alert {
    id: string;
    symbol: string;
    metric: 'Spot Price' | 'Near-Month Future' | 'Future Price Difference';
    condition: 'crosses' | 'greater than' | 'less than' | 'turns negative' | 'turns positive';
    value: number;
    active: boolean;
}

export interface OrderDetails {
  symbol: string;
  transactionType: 'BUY' | 'SELL';
  orderType: 'MARKET' | 'LIMIT';
  quantity: number;
  price?: number;
}

import React, { useState, useEffect } from 'react';
import { WatchlistItem, OrderDetails } from '../types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { X } from 'lucide-react';

interface OrderWindowProps {
  instrument: WatchlistItem;
  initialTransactionType: 'BUY' | 'SELL';
  isOpen: boolean;
  onClose: () => void;
  onSubmitOrder: (order: OrderDetails, instrument: WatchlistItem) => void;
}

export const OrderWindow: React.FC<OrderWindowProps> = ({ instrument, initialTransactionType, isOpen, onClose, onSubmitOrder }) => {
  const [transactionType, setTransactionType] = useState<'BUY' | 'SELL'>(initialTransactionType);
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT'>('MARKET');
  const [quantity, setQuantity] = useState<number>(instrument.lotSize);
  const [price, setPrice] = useState<number>(instrument.nearMonthFuture);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setTransactionType(initialTransactionType);
    setQuantity(instrument.lotSize);
    setPrice(instrument.nearMonthFuture);
    setOrderType('MARKET');
    setError('');
  }, [instrument, initialTransactionType]);

  if (!isOpen) return null;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    const newQuantity = isNaN(value) ? 0 : value;
    setQuantity(newQuantity);
    if (newQuantity > 0 && newQuantity % instrument.lotSize !== 0) {
      setError(`Quantity must be a multiple of lot size (${instrument.lotSize}).`);
    } else {
      setError('');
    }
  };

  const handleSubmit = () => {
    if (error) return;
    if (quantity <= 0) {
      setError('Quantity must be greater than 0.');
      return;
    }
    const orderDetails: OrderDetails = {
      symbol: instrument.symbol,
      transactionType,
      orderType,
      quantity,
      price: orderType === 'LIMIT' ? price : undefined,
    };
    onSubmitOrder(orderDetails, instrument);
    onClose();
  };

  const estimatedMargin = (orderType === 'LIMIT' ? price : instrument.nearMonthFuture) * quantity;
  const isBuy = transactionType === 'BUY';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <Card className="w-full max-w-md animate-fade-in-up">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Place Order: <span className="font-mono">{instrument.symbol}</span></CardTitle>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700">
            <X size={20} />
          </button>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={() => setTransactionType('BUY')} variant={isBuy ? 'primary' : 'secondary'} className={`w-full ${isBuy ? '' : 'bg-gray-700'}`}>BUY</Button>
            <Button onClick={() => setTransactionType('SELL')} variant={!isBuy ? 'danger' : 'secondary'} className={`w-full ${!isBuy ? '' : 'bg-gray-700'}`}>SELL</Button>
          </div>
          <div className="flex items-center space-x-4 p-2 bg-gray-900/50 rounded-md">
            <label className="flex-1 flex items-center justify-center gap-2 text-gray-200 cursor-pointer">
              <input type="radio" name="orderType" value="MARKET" checked={orderType === 'MARKET'} onChange={() => setOrderType('MARKET')} className="h-4 w-4 bg-gray-700 border-gray-600 text-green-600 focus:ring-green-500" />
              Market
            </label>
            <div className="w-px h-6 bg-gray-700"></div>
            <label className="flex-1 flex items-center justify-center gap-2 text-gray-200 cursor-pointer">
              <input type="radio" name="orderType" value="LIMIT" checked={orderType === 'LIMIT'} onChange={() => setOrderType('LIMIT')} className="h-4 w-4 bg-gray-700 border-gray-600 text-green-600 focus:ring-green-500" />
              Limit
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Quantity"
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              step={instrument.lotSize}
              min={instrument.lotSize}
            />
            <Input
              label="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              disabled={orderType === 'MARKET'}
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <div className="text-sm text-gray-400">
            Lot Size: <span className="font-semibold text-gray-200">{instrument.lotSize}</span>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <div className="flex justify-between w-full text-sm">
            <span className="text-gray-400">Estimated Margin:</span>
            <span className="font-mono text-white">₹ {estimatedMargin.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
          <Button onClick={handleSubmit} disabled={!!error || quantity <= 0} className="w-full" variant={isBuy ? 'primary' : 'danger'}>
            Place {transactionType} Order
          </Button>
        </CardFooter>
      </Card>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
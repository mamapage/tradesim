
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { WatchlistTable } from '../components/WatchlistTable';
import { OrderWindow } from '../components/OrderWindow';
import { WatchlistItem, OrderDetails } from '../types';

interface DashboardPageProps {
  handleExecuteOrder: (order: OrderDetails, instrument: WatchlistItem) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ handleExecuteOrder }) => {
  const [isOrderWindowOpen, setOrderWindowOpen] = useState(false);
  const [selectedInstrument, setSelectedInstrument] = useState<WatchlistItem | null>(null);
  const [initialTransactionType, setInitialTransactionType] = useState<'BUY' | 'SELL'>('BUY');

  const openOrderWindow = (instrument: WatchlistItem, type: 'BUY' | 'SELL') => {
    setSelectedInstrument(instrument);
    setInitialTransactionType(type);
    setOrderWindowOpen(true);
  };

  const closeOrderWindow = () => {
    setOrderWindowOpen(false);
    setSelectedInstrument(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>F&O Watchlist</CardTitle>
          <CardDescription>
            Live prices for stocks and indices futures. Click Buy/Sell to place a paper trade.
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          <WatchlistTable onOpenOrderWindow={openOrderWindow} />
        </CardContent>
      </Card>
      {isOrderWindowOpen && selectedInstrument && (
        <OrderWindow
          isOpen={isOrderWindowOpen}
          onClose={closeOrderWindow}
          instrument={selectedInstrument}
          initialTransactionType={initialTransactionType}
          onSubmitOrder={handleExecuteOrder}
        />
      )}
    </div>
  );
};

export default DashboardPage;
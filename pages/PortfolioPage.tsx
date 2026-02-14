
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Position, WatchlistItem, OrderDetails } from '../types';
import { PlusCircle } from 'lucide-react';
import { OrderWindow } from '../components/OrderWindow';
import { InstrumentSelectorModal } from '../components/InstrumentSelectorModal';
import { INITIAL_WATCHLIST_DATA } from '../constants';

interface PortfolioPageProps {
    positions: Position[];
    handleExecuteOrder: (order: OrderDetails, instrument: WatchlistItem) => void;
}

const PortfolioPage: React.FC<PortfolioPageProps> = ({ positions: initialPositions, handleExecuteOrder }) => {
    const [positions, setPositions] = useState<Position[]>(initialPositions);
    const [isOrderWindowOpen, setOrderWindowOpen] = useState(false);
    const [isInstrumentSelectorOpen, setInstrumentSelectorOpen] = useState(false);
    const [selectedInstrument, setSelectedInstrument] = useState<WatchlistItem | null>(null);
    const [positionToClose, setPositionToClose] = useState<Position | null>(null);
    const [initialTransactionType, setInitialTransactionType] = useState<'BUY' | 'SELL'>('BUY');


    useEffect(() => {
        setPositions(initialPositions);
    }, [initialPositions]);

    useEffect(() => {
        const interval = setInterval(() => {
            setPositions(currentPositions => 
                currentPositions.map(pos => {
                    const change = (Math.random() - 0.5) * (pos.ltp * 0.005);
                    const newLtp = parseFloat((pos.ltp + change).toFixed(2));
                    const newPnl = (newLtp - pos.avgPrice) * pos.quantity;
                    return { ...pos, ltp: newLtp, pnl: newPnl };
                })
            );
        }, 1500);

        return () => clearInterval(interval);
    }, []);
    
    const handleInstrumentSelect = (instrument: WatchlistItem) => {
        setSelectedInstrument(instrument);
        setInitialTransactionType('BUY');
        setPositionToClose(null);
        setInstrumentSelectorOpen(false);
        setOrderWindowOpen(true);
    };

    const handleRequestClose = (position: Position) => {
        const instrumentToClose = INITIAL_WATCHLIST_DATA.find(item => item.symbol === position.symbol);
        if (!instrumentToClose) {
            alert("Could not find instrument in watchlist to close position.");
            return;
        }
        
        setSelectedInstrument(instrumentToClose);
        setInitialTransactionType(position.quantity > 0 ? 'SELL' : 'BUY');
        setPositionToClose(position);
        setOrderWindowOpen(true);
    };

    const closeOrderWindow = () => {
        setOrderWindowOpen(false);
        setSelectedInstrument(null);
        setPositionToClose(null);
    };

    const totalPnl = positions.reduce((acc, pos) => acc + pos.pnl, 0);
    const pnlColor = totalPnl >= 0 ? 'text-green-400' : 'text-red-400';
    
    const getPnlClasses = (pnl: number) => {
        if (pnl > 0) return 'text-green-300 bg-green-500/10';
        if (pnl < 0) return 'text-red-300 bg-red-500/10';
        return 'text-gray-400';
    }

  return (
    <>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>My Portfolio</CardTitle>
            <CardDescription>Overview of your current paper trading positions and performance.</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto p-0">
              {positions.length > 0 ? (
              <table className="w-full min-w-[800px] text-sm">
                  <thead className="border-b-2 border-gray-700 bg-gray-800">
                      <tr>
                          <th className="p-4 text-left font-semibold text-gray-400">Symbol</th>
                          <th className="p-4 text-right font-semibold text-gray-400">Net Quantity</th>
                          <th className="p-4 text-right font-semibold text-gray-400">Avg. Price</th>
                          <th className="p-4 text-right font-semibold text-gray-400">LTP</th>
                          <th className="p-4 text-right font-semibold text-gray-400">P&L</th>
                          <th className="p-4 text-center font-semibold text-gray-400">Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                      {positions.map((pos) => {
                          const quantityColor = pos.quantity > 0 ? 'text-green-400' : 'text-red-400';
                          return (
                              <tr key={pos.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                                  <td className="p-4 font-bold text-white">{pos.symbol}</td>
                                  <td className={`p-4 text-right font-mono font-semibold ${quantityColor}`}>{pos.quantity}</td>
                                  <td className="p-4 text-right font-mono">{pos.avgPrice.toFixed(2)}</td>
                                  <td className="p-4 text-right font-mono">{pos.ltp.toFixed(2)}</td>
                                  <td className={`p-4 text-right font-mono font-semibold ${getPnlClasses(pos.pnl)}`}>{pos.pnl.toFixed(2)}</td>
                                  <td className="p-4 text-center">
                                      <Button variant="secondary" size="sm" onClick={() => handleRequestClose(pos)}>
                                          Close
                                      </Button>
                                  </td>
                              </tr>
                          )
                      })}
                  </tbody>
              </table>
              ) : (
              <div className="text-center py-10 text-gray-500 p-6">
                  <p>You have no open positions.</p>
                  <p className="text-sm">Place a new order to get started.</p>
              </div>
              )}
          </CardContent>
          
          <CardFooter className="flex justify-between items-center">
              {positions.length > 0 ? (
                  <div className="flex items-baseline gap-2">
                      <span className="text-gray-400">Total P&L:</span>
                      <span className={`text-lg font-bold ${pnlColor}`}>₹ {totalPnl.toFixed(2)}</span>
                  </div>
              ) : <div />}
              <Button onClick={() => setInstrumentSelectorOpen(true)}>
                  <PlusCircle size={18} />
                  New Order
              </Button>
          </CardFooter>
        </Card>
      </div>

      <InstrumentSelectorModal
        isOpen={isInstrumentSelectorOpen}
        onClose={() => setInstrumentSelectorOpen(false)}
        instruments={INITIAL_WATCHLIST_DATA}
        onSelect={handleInstrumentSelect}
      />

      {isOrderWindowOpen && selectedInstrument && (
        <OrderWindow
          isOpen={isOrderWindowOpen}
          onClose={closeOrderWindow}
          instrument={selectedInstrument}
          initialTransactionType={initialTransactionType}
          onSubmitOrder={handleExecuteOrder}
          positionToClose={positionToClose}
        />
      )}
    </>
  );
};

export default PortfolioPage;
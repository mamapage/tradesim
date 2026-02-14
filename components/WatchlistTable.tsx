
import React, { useState, useEffect } from 'react';
import { ChevronsUpDown, ArrowUp, ArrowDown, RefreshCw } from 'lucide-react';
import { WatchlistItem, SortConfig, SortableKey } from '../types';
import { useSortableTable } from '../hooks/useSortableTable';
import { Button } from './ui/Button';
import { fetchLiveWatchlistData } from '../services/marketData';

const SortableHeader: React.FC<{
  label: string;
  sortKey: SortableKey;
  sortConfig: SortConfig | null;
  requestSort: (key: SortableKey) => void;
  className?: string;
}> = ({ label, sortKey, sortConfig, requestSort, className }) => {
  const isSorted = sortConfig?.key === sortKey;
  const direction = isSorted ? sortConfig.direction : undefined;

  return (
    <th className={`p-4 text-left font-semibold text-gray-400 cursor-pointer hover:text-white ${className}`} onClick={() => requestSort(sortKey)}>
      <div className="flex items-center gap-2">
        {label}
        {isSorted ? (
          direction === 'ascending' ? <ArrowUp size={16} /> : <ArrowDown size={16} />
        ) : (
          <ChevronsUpDown size={16} className="text-gray-500" />
        )}
      </div>
    </th>
  );
};

interface WatchlistTableProps {
  onOpenOrderWindow: (instrument: WatchlistItem, type: 'BUY' | 'SELL') => void;
}

export const WatchlistTable: React.FC<WatchlistTableProps> = ({ onOpenOrderWindow }) => {
    const [watchlistData, setWatchlistData] = useState<WatchlistItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    useEffect(() => {
        let isMounted = true;
        
        const dataFetcher = async () => {
            try {
                const data = await fetchLiveWatchlistData();
                if (isMounted) {
                    setWatchlistData(data);
                }
            } catch (error) {
                console.error("Failed to fetch real-time market data:", error);
            }
        };

        const initialLoad = async () => {
            await dataFetcher();
            if (isMounted) {
                setIsLoading(false);
            }
        };

        initialLoad();
        
        const intervalId = setInterval(dataFetcher, 2000);

        return () => {
            isMounted = false;
            clearInterval(intervalId);
        };
    }, []);

  const { items, requestSort, sortConfig } = useSortableTable(watchlistData);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-10 space-y-2">
        <RefreshCw className="animate-spin text-gray-400" size={24} />
        <p className="text-gray-500">Connecting to live market feed...</p>
      </div>
    );
  }

  return (
    <table className="w-full min-w-[900px] text-sm">
        <thead className="border-b-2 border-gray-700 bg-gray-800">
            <tr>
                <SortableHeader label="Symbol" sortKey="symbol" sortConfig={sortConfig} requestSort={requestSort} />
                <SortableHeader label="Spot Price" sortKey="spotPrice" sortConfig={sortConfig} requestSort={requestSort} className="text-right" />
                <SortableHeader label="Near-Month Future" sortKey="nearMonthFuture" sortConfig={sortConfig} requestSort={requestSort} className="text-right" />
                <SortableHeader label="Next-Month Future" sortKey="nextMonthFuture" sortConfig={sortConfig} requestSort={requestSort} className="text-right" />
                <SortableHeader label="Future Price Difference" sortKey="futurePriceDifference" sortConfig={sortConfig} requestSort={requestSort} className="text-right" />
                <SortableHeader label="Lot Size" sortKey="lotSize" sortConfig={sortConfig} requestSort={requestSort} className="text-right" />
                <th className="p-4 text-center font-semibold text-gray-400">Actions</th>
            </tr>
        </thead>
        <tbody>
            {items.map((item) => {
                const { futurePriceDifference } = item;
                const diffColor = futurePriceDifference > 0 ? 'text-green-400' : futurePriceDifference < 0 ? 'text-red-400' : 'text-gray-400';

                return (
                    <tr key={item.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                        <td className="p-4 font-bold text-white">{item.symbol}</td>
                        <td className="p-4 text-right font-mono text-gray-300">{item.spotPrice.toFixed(2)}</td>
                        <td className="p-4 text-right font-mono text-gray-300">{item.nearMonthFuture.toFixed(2)}</td>
                        <td className="p-4 text-right font-mono text-gray-300">{item.nextMonthFuture.toFixed(2)}</td>
                        <td className={`p-4 text-right font-mono font-semibold ${diffColor}`}>
                            {futurePriceDifference.toFixed(2)}
                        </td>
                        <td className="p-4 text-right font-mono text-gray-300">{item.lotSize}</td>
                        <td className="p-4">
                            <div className="flex justify-center items-center gap-2">
                                <Button size="sm" variant="primary" onClick={() => onOpenOrderWindow(item, 'BUY')}>Buy</Button>
                                <Button size="sm" variant="danger" onClick={() => onOpenOrderWindow(item, 'SELL')}>Sell</Button>
                            </div>
                        </td>
                    </tr>
                );
            })}
        </tbody>
    </table>
  );
};

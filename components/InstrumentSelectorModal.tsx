
import React, { useState, useMemo } from 'react';
import { WatchlistItem } from '../types';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Input } from './ui/Input';
import { X, Search } from 'lucide-react';

interface InstrumentSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  instruments: WatchlistItem[];
  onSelect: (instrument: WatchlistItem) => void;
}

export const InstrumentSelectorModal: React.FC<InstrumentSelectorModalProps> = ({ isOpen, onClose, instruments, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInstruments = useMemo(() => {
    if (!searchTerm) return instruments;
    return instruments.filter(inst =>
      inst.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [instruments, searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <Card className="w-full max-w-md animate-fade-in-up flex flex-col max-h-[80vh]">
        <CardHeader className="flex flex-row items-center justify-between flex-shrink-0">
          <CardTitle>Select Instrument</CardTitle>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700">
            <X size={20} />
          </button>
        </CardHeader>
        <div className="p-4 border-b border-gray-700 flex-shrink-0 relative">
          <Input
            type="text"
            placeholder="Search for NIFTY, RELIANCE..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search size={18} className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-400"/>
        </div>
        <CardContent className="p-0 overflow-y-auto">
          <ul className="divide-y divide-gray-800">
            {filteredInstruments.map(instrument => (
              <li
                key={instrument.id}
                onClick={() => onSelect(instrument)}
                className="p-4 cursor-pointer hover:bg-gray-700/50 transition-colors"
              >
                <span className="font-semibold text-white">{instrument.symbol}</span>
              </li>
            ))}
          </ul>
        </CardContent>
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

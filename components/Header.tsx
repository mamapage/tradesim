
import React from 'react';
import { TrendingUp } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 p-4 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <div className="bg-green-500 p-2 rounded-lg">
          <TrendingUp className="text-white" />
        </div>
        <h1 className="text-xl font-bold text-white">F&O Paper Trading</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm text-gray-400">Virtual Funds</p>
          <p className="font-semibold text-lg text-green-400">₹ 1,000,000.00</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
            <span className="font-bold text-gray-300">U</span>
        </div>
      </div>
    </header>
  );
};

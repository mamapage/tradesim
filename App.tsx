
import React, { useState } from 'react';
import { Sidebar, SidebarItem } from './components/Sidebar';
import { LayoutDashboard, Wallet, BellRing, Settings } from 'lucide-react';
import DashboardPage from './pages/DashboardPage';
import PortfolioPage from './pages/PortfolioPage';
import AlertsPage from './pages/AlertsPage';
import SettingsPage from './pages/SettingsPage';
import { Header } from './components/Header';
import { Position, OrderDetails, WatchlistItem } from './types';
import { INITIAL_PORTFOLIO_DATA } from './constants';

type Page = 'dashboard' | 'portfolio' | 'alerts' | 'settings';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('dashboard');
  const [positions, setPositions] = useState<Position[]>(INITIAL_PORTFOLIO_DATA);

  const handleExecuteOrder = (order: OrderDetails, instrument: WatchlistItem) => {
    const executionPrice = order.orderType === 'LIMIT' && order.price ? order.price : instrument.nearMonthFuture;

    const newPosition: Position = {
      id: `pos_${Date.now()}_${instrument.symbol}`,
      symbol: `${order.symbol} ${order.transactionType === 'SELL' ? 'SHORT' : 'LONG'}`,
      quantity: order.transactionType === 'BUY' ? order.quantity : -order.quantity,
      avgPrice: executionPrice,
      ltp: executionPrice,
      pnl: 0,
    };

    setPositions(prevPositions => [...prevPositions, newPosition]);
    alert(`${order.transactionType} order for ${order.quantity} of ${order.symbol} placed successfully!`);
    setActivePage('portfolio');
  };


  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage handleExecuteOrder={handleExecuteOrder} />;
      case 'portfolio':
        return <PortfolioPage positions={positions} />;
      case 'alerts':
        return <AlertsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage handleExecuteOrder={handleExecuteOrder} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Sidebar>
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          active={activePage === 'dashboard'}
          onClick={() => setActivePage('dashboard')}
        />
        <SidebarItem
          icon={<Wallet size={20} />}
          text="Portfolio"
          active={activePage === 'portfolio'}
          onClick={() => setActivePage('portfolio')}
        />
        <SidebarItem
          icon={<BellRing size={20} />}
          text="Alerts"
          active={activePage === 'alerts'}
          onClick={() => setActivePage('alerts')}
        />
        <SidebarItem
          icon={<Settings size={20} />}
          text="Settings"
          active={activePage === 'settings'}
          onClick={() => setActivePage('settings')}
        />
      </Sidebar>
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default App;


import React from 'react';
import { TrendingUp } from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  onClick: () => void;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, active, onClick }) => {
  return (
    <li
      onClick={onClick}
      className={`
        relative flex items-center py-3 px-4 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? 'bg-gradient-to-tr from-gray-700 to-gray-800 text-white shadow-lg'
            : 'hover:bg-gray-700 text-gray-400 hover:text-white'
        }
    `}
    >
      {icon}
      <span className="ml-3">{text}</span>
    </li>
  );
};

export const Sidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <aside className="h-screen sticky top-0">
      <nav className="h-full flex flex-col bg-gray-800 border-r border-gray-700 shadow-sm p-4">
        <div className="p-4 pb-2 flex justify-between items-center mb-4">
            <div className="bg-green-500 p-2 rounded-lg">
                <TrendingUp size={24} className="text-white" />
            </div>
        </div>
        <ul className="flex-1 px-3">{children}</ul>
      </nav>
    </aside>
  );
};

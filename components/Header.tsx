
import React from 'react';
import { PhotoIcon } from './icons/PhotoIcon';
import { HistoryIcon } from './icons/HistoryIcon';

interface HeaderProps {
    onLogoClick: () => void;
    onHistoryClick: () => void;
    isHistoryVisible: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onLogoClick, onHistoryClick, isHistoryVisible }) => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-20">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <button onClick={onLogoClick} className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-lg p-1 -m-1">
          <PhotoIcon className="w-8 h-8 text-cyan-400" />
          <h1 className="text-2xl font-bold tracking-tight text-white">
            AI Photo Editor <span className="text-cyan-400">Pro</span>
          </h1>
        </button>

        {isHistoryVisible && (
            <button
                onClick={onHistoryClick}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-700 hover:bg-cyan-500/80 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
                aria-label="View history"
            >
                <HistoryIcon className="w-5 h-5" />
                <span className="hidden sm:inline">History</span>
            </button>
        )}
      </div>
    </header>
  );
};

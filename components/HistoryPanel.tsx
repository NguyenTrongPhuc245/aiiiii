
import React from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { DownloadIcon } from './icons/DownloadIcon';

interface HistoryPanelProps {
  history: string[];
  onBack: () => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onBack }) => {
  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white">Image History</h2>
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-cyan-500/80 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Back to Editor</span>
        </button>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-20 bg-gray-800/50 rounded-lg border border-gray-700">
          <p className="text-gray-400 text-xl font-semibold">No generated images yet.</p>
          <p className="text-gray-500 mt-2">Go back to the editor and create some amazing images!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {history.map((imageUrl, index) => (
            <div key={index} className="relative group aspect-square bg-gray-800 rounded-lg overflow-hidden border-2 border-transparent hover:border-cyan-400 transition-all duration-300 shadow-lg">
              <img
                src={imageUrl}
                alt={`Generated image ${index + 1}`}
                className="w-full h-full object-contain"
                loading="lazy"
              />
              <a 
                href={imageUrl} 
                download={`ai-generated-${new Date().getTime()}-${index}.png`} 
                className="absolute top-2 right-2 p-2 bg-gray-900/60 hover:bg-cyan-500 rounded-full transition-colors duration-200 opacity-0 group-hover:opacity-100"
                aria-label="Download image"
                onClick={(e) => e.stopPropagation()}
              >
                <DownloadIcon className="w-5 h-5 text-white" />
              </a>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

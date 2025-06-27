
import React, { useState } from 'react';
import { MagicWandIcon } from './MagicWandIcon';
import { PlusIcon } from './icons/PlusIcon';
import { DownloadIcon } from './icons/DownloadIcon';

interface ControlPanelProps {
  onGenerate: (prompt: string) => void;
  onReset: () => void;
  onSave: () => void;
  isLoading: boolean;
  isSaveDisabled: boolean;
}

const ActionButton: React.FC<{ onClick: () => void; disabled: boolean; children: React.ReactNode; tooltip: string;}> = ({ onClick, disabled, children, tooltip }) => (
    <div className="relative group">
        <button
            onClick={onClick}
            disabled={disabled}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-cyan-500/80 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:opacity-50"
        >
            {children}
        </button>
         <div className="absolute bottom-full mb-2 w-max px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none left-1/2 -translate-x-1/2">
            {tooltip}
        </div>
    </div>
);

export const ControlPanel: React.FC<ControlPanelProps> = ({ onGenerate, onReset, onSave, isLoading, isSaveDisabled }) => {
  const [customPrompt, setCustomPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPrompt.trim()) {
      onGenerate(customPrompt);
    }
  };
  
  return (
    <div className="w-full max-w-5xl p-4 bg-gray-800/60 rounded-xl shadow-lg border border-gray-700 backdrop-blur-md">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input 
          type="text"
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          placeholder="Describe the image you want to create..."
          disabled={isLoading}
          className="flex-grow bg-gray-700 border border-gray-600 text-gray-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
        />
        <button type="submit" disabled={isLoading || !customPrompt.trim()} className="flex items-center justify-center space-x-2 px-5 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-md transition-colors transform hover:scale-105 disabled:scale-100">
          <MagicWandIcon className="w-5 h-5" />
          <span>Create</span>
        </button>
      </form>
       <div className="border-t border-gray-700 mt-4 pt-4 flex justify-end items-center gap-3">
         <ActionButton onClick={onSave} disabled={isLoading || isSaveDisabled} tooltip="Save the generated image">
          <DownloadIcon className="w-5 h-5" />
          <span className="hidden sm:inline">Save Image</span>
        </ActionButton>
        <ActionButton onClick={onReset} disabled={isLoading} tooltip="Clear everything and start over">
          <PlusIcon className="w-5 h-5" />
          <span className="hidden sm:inline">New Session</span>
        </ActionButton>
       </div>
    </div>
  );
};
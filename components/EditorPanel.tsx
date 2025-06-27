import React from 'react';
import { ImagePreview } from './ImagePreview';
import { ControlPanel } from './ControlPanel';
import { ActionType, CssFilters } from '../types';

interface EditorPanelProps {
  originalImage: string;
  processedImage: string | null;
  isLoading: boolean;
  loadingMessage: string;
  error: string | null;
  onAction: (action: ActionType, customPrompt?: string) => void;
  onReset: () => void;
  onSave: () => void;
  cssFilters: CssFilters;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({
  originalImage,
  processedImage,
  isLoading,
  loadingMessage,
  error,
  onAction,
  onReset,
  onSave,
  cssFilters
}) => {
  const handleGenerate = (prompt: string) => {
    onAction(ActionType.CUSTOM, prompt);
  };
  
  return (
    <div className="w-full flex flex-col items-center">
      <ControlPanel onGenerate={handleGenerate} onReset={onReset} onSave={onSave} isLoading={isLoading} isSaveDisabled={!processedImage}/>
      {error && <div className="my-4 p-3 bg-red-500/20 text-red-300 border border-red-500 rounded-md w-full max-w-4xl text-center">{error}</div>}
      <div className="mt-8 w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <ImagePreview 
          title="Original" 
          imageUrl={originalImage} 
          cssFilters={cssFilters}
        />
        <ImagePreview 
          title="AI Processed" 
          imageUrl={processedImage} 
          isLoading={isLoading} 
          loadingMessage={loadingMessage}
          isPlaceholder={!processedImage && !isLoading}
          placeholderText='Your AI-edited image will appear here.'
        />
      </div>
    </div>
  );
};

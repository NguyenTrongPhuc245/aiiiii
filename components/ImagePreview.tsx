import React from 'react';
import { DownloadIcon } from './icons/DownloadIcon';
import type { CssFilters } from '../types';

interface ImagePreviewProps {
  title: string;
  imageUrl: string | null;
  isLoading?: boolean;
  loadingMessage?: string;
  isPlaceholder?: boolean;
  placeholderText?: string;
  isDownloadable?: boolean;
  cssFilters?: CssFilters;
}

const Spinner: React.FC = () => (
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
);

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  title,
  imageUrl,
  isLoading = false,
  loadingMessage,
  isPlaceholder = false,
  placeholderText = 'Image will appear here',
  isDownloadable = false,
  cssFilters,
}) => {

  const filterStyle = cssFilters 
    ? { filter: Object.entries(cssFilters).map(([key, value]) => `${key}(${value})`).join(' ') } 
    : undefined;

  return (
    <div className="flex flex-col space-y-3">
      <h3 className="text-xl font-semibold text-center text-gray-300">{title}</h3>
      <div className="relative w-full aspect-square bg-gray-800/50 rounded-lg shadow-inner border border-gray-700 overflow-hidden flex items-center justify-center">
        {(isLoading || isPlaceholder || !imageUrl) ? (
            <div className="flex flex-col items-center justify-center text-center text-gray-400 p-4">
              {isLoading ? (
                <>
                  <Spinner />
                  <p className="mt-4 text-lg font-semibold text-cyan-300">{loadingMessage || 'Processing...'}</p>
                </>
              ) : (
                <p>{placeholderText}</p>
              )}
            </div>
        ) : (
          <>
            <img
              src={imageUrl}
              alt={title}
              className="object-contain w-full h-full"
              style={filterStyle}
            />
            {isDownloadable && imageUrl && (
              <a 
                href={imageUrl} 
                download={`ai-generated-${Date.now()}.png`} 
                className="absolute top-2 right-2 p-2 bg-gray-900/60 hover:bg-cyan-500 rounded-full transition-colors duration-200"
                aria-label="Download image"
                onClick={(e) => e.stopPropagation()}
              >
                <DownloadIcon className="w-5 h-5 text-white" />
              </a>
            )}
          </>
        )}
      </div>
    </div>
  );
};

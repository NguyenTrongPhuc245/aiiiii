
import React, { useState, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { generateImageFromPrompt, getImageDescription } from './services/geminiService';
import { HistoryPanel } from './components/HistoryPanel';
import { ControlPanel } from './components/ControlPanel';
import { ImagePreview } from './components/ImagePreview';

export default function App() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [activeView, setActiveView] = useState<'editor' | 'history'>('editor');
  
  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImage(reader.result as string);
      setProcessedImage(null); // Clear previous generation
      setError(null);
      setActiveView('editor');
    };
    reader.onerror = () => {
      setError("Failed to read the image file.");
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setError(null);
    setIsLoading(false);
    setActiveView('editor');
  };
  
  const handleSaveImage = useCallback(() => {
    if (!processedImage) return;
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = `ai-generated-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [processedImage]);

  const getBase64Data = (dataUrl: string): string => dataUrl.split(',')[1];

  const handleGenerate = useCallback(async (prompt: string) => {
    if (!prompt.trim()) {
      setError("Please enter a prompt to create an image.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let generatedImage: string;
      if (originalImage) {
        setLoadingMessage("AI is analyzing your image...");
        const imageData = getBase64Data(originalImage);
        const imageMimeType = originalImage.substring(originalImage.indexOf(":") + 1, originalImage.indexOf(";"));
        const description = await getImageDescription(imageData, imageMimeType, "Describe this image in detail for an AI image generator, focusing on subjects, style, and composition.");
        
        const finalPrompt = `Using this as inspiration: [${description}], create a new image that is best described as: "${prompt}"`;
        setLoadingMessage("AI is creating your new image...");
        generatedImage = await generateImageFromPrompt(finalPrompt);
      } else {
        setLoadingMessage("AI is creating your image from scratch...");
        generatedImage = await generateImageFromPrompt(prompt);
      }
      
      setProcessedImage(generatedImage);
      setHistory(prev => [generatedImage, ...prev].slice(0, 50));
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      setError(`AI Task Failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [originalImage]);

  const placeholderText = originalImage 
    ? 'Your AI-modified image will appear here.' 
    : 'Your AI-generated image will appear here.';

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header 
        onLogoClick={() => setActiveView('editor')} 
        onHistoryClick={() => setActiveView('history')} 
        isHistoryVisible={history.length > 0}
      />
      {activeView === 'editor' ? (
        <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
            <ControlPanel
                onGenerate={handleGenerate}
                onReset={handleReset}
                onSave={handleSaveImage}
                isLoading={isLoading}
                isSaveDisabled={!processedImage && !isLoading}
            />
            {error && <div className="my-4 p-3 bg-red-500/20 text-red-300 border border-red-500 rounded-md w-full max-w-5xl text-center">{error}</div>}
            <div className="mt-8 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {originalImage ? (
                <ImagePreview title="Original" imageUrl={originalImage} />
              ) : (
                <div className="h-full flex flex-col">
                   <h3 className="text-xl font-semibold text-center text-gray-300 mb-3">Upload Image (Optional)</h3>
                   <div className="flex-grow">
                     <ImageUploader onImageUpload={handleImageUpload} />
                   </div>
                </div>
              )}
              <ImagePreview 
                title="AI Generated" 
                imageUrl={processedImage} 
                isLoading={isLoading} 
                loadingMessage={loadingMessage}
                isPlaceholder={!processedImage && !isLoading}
                placeholderText={placeholderText}
                isDownloadable={!!processedImage}
              />
            </div>
        </main>
      ) : (
         <HistoryPanel history={history} onBack={() => setActiveView('editor')} />
      )}
      <Footer />
    </div>
  );
}

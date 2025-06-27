
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const visionModel = 'gemini-2.5-flash-preview-04-17';
const imageGenModel = 'imagen-3.0-generate-002';

const fileToGenerativePart = (base64Data: string, mimeType: string) => {
  return {
    inlineData: {
      data: base64Data,
      mimeType,
    },
  };
};

export async function getImageDescription(base64Data: string, mimeType: string, prompt: string): Promise<string> {
    const imagePart = fileToGenerativePart(base64Data, mimeType);
    
    const response = await ai.models.generateContent({
        model: visionModel,
        contents: { parts: [imagePart, {text: prompt}] },
        config: { thinkingConfig: { thinkingBudget: 0 } }
    });

    return response.text;
}

export async function generateImageFromPrompt(prompt: string): Promise<string> {
    const response = await ai.models.generateImages({
        model: imageGenModel,
        prompt: prompt,
        config: { numberOfImages: 1, outputMimeType: 'image/png' },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
        const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
        return `data:image/png;base64,${base64ImageBytes}`;
    }
    
    throw new Error("Image generation failed to produce an image.");
}

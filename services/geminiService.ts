import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates marketing copy based on parameters.
 */
export const generateMarketingCopy = async (
  topic: string,
  tone: string,
  audience: string,
  format: string
): Promise<string> => {
  try {
    const prompt = `
      Act as a world-class marketing copywriter for the Bellabona Marketing Suite.
      Create a ${format} about "${topic}".
      Target Audience: ${audience}.
      Tone: ${tone}.
      
      Keep it engaging, professional, and optimized for conversion.
      Return ONLY the copy content, no preamble.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      }
    });

    return response.text || "No content generated. Please try again.";
  } catch (error) {
    console.error("Gemini Text Error:", error);
    throw new Error("Failed to generate copy. Please check your API key and try again.");
  }
};

/**
 * Generates an image for marketing campaigns.
 */
export const generateMarketingImage = async (
  prompt: string,
  aspectRatio: "1:1" | "3:4" | "4:3" | "16:9" = "1:1"
): Promise<string> => {
  try {
    const enhancedPrompt = `High quality, professional marketing photography, cinematic lighting, ${prompt}, 8k resolution, photorealistic`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: enhancedPrompt }]
      },
      config: {
        imageConfig: {
            aspectRatio: aspectRatio,
        }
      }
    });

    let imageUrl = '';
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          break; // Found the image
        }
      }
    }

    if (!imageUrl) {
      throw new Error("No image data found in response.");
    }

    return imageUrl;
  } catch (error) {
    console.error("Gemini Image Error:", error);
    throw new Error("Failed to generate image. Please try again.");
  }
};

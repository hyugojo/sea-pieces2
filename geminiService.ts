import { GoogleGenAI, Type } from "@google/genai";

// Initialize AI directly before usage to ensure current API Key
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateProjectDetails = async (title: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a legendary pirate captain named Hyu. Based on the project title "${title}", generate a short, catchy one-sentence description using pirate slang (max 15 words) and suggest one suitable emoji icon and one "nautical category" name. Return as JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            description: { type: Type.STRING },
            icon: { type: Type.STRING },
            category: { type: Type.STRING }
          },
          required: ["description", "icon", "category"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (e) {
    console.error("AI Generation Error:", e);
    return null;
  }
};

export const improveBio = async (currentBio: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are Captain Hyu. Rewrite this bio to sound more like a respected pirate lord: "${currentBio}". Keep it under 100 characters and very immersive.`,
    });
    return response.text;
  } catch (e) {
    console.error("AI Bio Error:", e);
    return currentBio;
  }
};
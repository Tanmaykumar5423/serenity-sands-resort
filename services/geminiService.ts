import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SearchResult, GroundingChunk } from "../types";

// Initialize Gemini Client
const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key not found in environment variables");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

// 1. Chatbot Service using gemini-3-pro-preview
export const sendChatMessage = async (
  history: { role: string; parts: { text: string }[] }[],
  newMessage: string
): Promise<string> => {
  const ai = getClient();
  if (!ai) return "I'm sorry, I cannot connect to the service right now.";

  try {
    const chat = ai.chats.create({
      model: "gemini-3-pro-preview",
      config: {
        systemInstruction: `You are Aurelia, the virtual concierge for Serenity Sands Luxury Resort. 
        Your tone is sophisticated, warm, and helpful. 
        You assist guests with booking rooms, finding restaurants, and planning activities.
        Use the following context:
        - We have Ocean Suites ($850), Garden Villas ($1200), and Overwater Bungalows ($2500).
        - Restaurants: Azure (Seafood), Spice Route (Asian), Sunset Lounge (Cocktails).
        - Spa: Serenity Spa offers massages, facials, and yoga.
        - Location: A private island in the Maldives.
        Keep responses concise and elegant.`,
      },
      history: history,
    });

    const response = await chat.sendMessage({
      message: newMessage,
    });

    return response.text || "I apologize, I could not generate a response.";
  } catch (error) {
    console.error("Chat Error:", error);
    return "I am currently experiencing a temporary connection issue. Please try again shortly.";
  }
};

// 2. Local Guide Search Service using gemini-2.5-flash with Google Search Tool
export const searchLocalInsights = async (query: string): Promise<SearchResult> => {
  const ai = getClient();
  if (!ai) return { text: "Service unavailable.", sources: [] };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Find information about: ${query}. Focus on events, weather, or news relevant to a tourist near a luxury resort in the Maldives (or generic tropical location if unspecified).`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    // Extract sources from grounding chunks
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[] | undefined;
    const sources = chunks
      ?.map((chunk) => {
        if (chunk.web) {
            return { uri: chunk.web.uri || '', title: chunk.web.title || 'Web Source' };
        }
        return null;
      })
      .filter((s): s is { uri: string; title: string } => s !== null && s.uri !== '') || [];

    // Remove duplicates
    const uniqueSources = Array.from(new Map(sources.map(item => [item.uri, item])).values());

    return {
      text: response.text || "No information found.",
      sources: uniqueSources,
    };

  } catch (error) {
    console.error("Search Error:", error);
    return { text: "I was unable to retrieve that information at this time.", sources: [] };
  }
};

// 3. Concierge Intelligence - Itinerary Generator
export const generateItinerary = async (preferences: string): Promise<string> => {
  const ai = getClient();
  if (!ai) return "Service unavailable.";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Create a luxurious, 1-day itinerary for a guest at Serenity Sands Resort based on these preferences: ${preferences}. 
      Include morning, afternoon, and evening activities. 
      Mention specific resort venues like 'Azure' for dinner or 'Serenity Spa'. 
      Format with clear headings.`,
    });
    return response.text || "Could not generate itinerary.";
  } catch (error) {
    console.error("Itinerary Error:", error);
    return "I couldn't create an itinerary right now.";
  }
};

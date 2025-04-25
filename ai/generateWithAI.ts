import { GoogleGenAI, Type } from "@google/genai";

type GenerateWithAIParams = {
  model?: string;
  prompt: string;
  schema?: any;
  thinkingBudget?: number;
  mimeType?: string;
};

export async function generateWithAI({
  model = "gemini-2.5-pro-exp-03-25",
  prompt,
  schema,
  thinkingBudget = 0,
  mimeType = "application/json",
}: GenerateWithAIParams): Promise<any> {
  try {
    const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Gemini API key is not defined in environment variables.");
    }

    const ai = new GoogleGenAI({ apiKey });

    const config = {
      thinkingConfig: {
        thinkingBudget,
      },
      responseMimeType: mimeType,
      responseSchema: schema,
    };

    const contents = [{ role: "user", parts: [{ text: prompt }] }];

    const response = await ai.models.generateContent({
      model,
      config,
      contents,
    });

    return response.text;
  } catch (error) {
    console.error("Error generating content with AI:", error);
    throw error;
  }
}

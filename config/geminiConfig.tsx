import { GoogleGenAI, Type } from "@google/genai";

export async function generateTopicsWithAI({ topic }: { topic: string }) {
  console.log("TOPICS ARE FETCHING");

  try {
    if (!process.env.EXPO_PUBLIC_GEMINI_API_KEY) {
      throw new Error(
        "Gemini API key is not defined in environment variables."
      );
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY,
    });

    console.log("AI GENERATED", ai,process.env.EXPO_PUBLIC_GEMINI_API_KEY);

    const model = "gemini-2.5-pro-exp-03-25";
    const prompt = `${topic}: As you are a coaching teacher,
        - User wants to learn about the topic
        - Generate 5-7 course titles for the study (SHORT)
        - Make sure it's related to the description
        - Output should be an array of strings in JSON format only
        - Do NOT add any plain text, explanations, or markdown – only output valid JSON
      `.trim();

    const config = {
      thinkingConfig: {
        thinkingBudget: 0,
      },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.STRING,
          description: "Short course title",
        },
      },
    };

    const contents = [{ role: "user", parts: [{ text: prompt }] }];

    const response = await ai.models.generateContent({
      model,
      config,
      contents,
    });

    // console.log("RESPONSE TEXT", response.text);
    return response.text;
  } catch (error) {
    console.error("Error generating topics:", error);
    throw error; // rethrow if you want the caller to handle it
  }
}

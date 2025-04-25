import { Type } from "@google/genai";

export const topicsBuilderPrompt = ({ topic }: { topic: string }) => {
    return `${topic}: As you are a coaching teacher,
- User wants to learn about the topic
- Generate 5-7 course titles for the study (SHORT)
- Make sure it's related to the description
- Output should be an array of strings in JSON format only
- Do NOT add any plain text, explanations, or markdown – only output valid JSON
`.trim();
}

export const topicsBuilderPromptConfig = {
    responseSchema: {
        type: Type.ARRAY,
        items: {
            type: Type.STRING,
            description: "Short course title",
        },
    },
}
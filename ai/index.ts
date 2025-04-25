
import { generateWithAI } from "@/ai/generateWithAI";
import { courseBuilderPrompt } from "./prompts/course";
import { topicsBuilderPrompt, topicsBuilderPromptConfig } from "./prompts/topics";

export const generateCourse = async (selectedTopics: string[]) => {
   
    try {
      const prompt = courseBuilderPrompt({ selectedTopics });
  
      const response = await generateWithAI({
        prompt,
        // schema: courseBuilderPromptConfig.responseSchema,
        thinkingBudget: 0,
      });
      console.log(JSON.parse(response));
      
  
      return JSON.parse(response) // assuming it returns valid JSON
    } catch (error) {
      console.error("Failed to generate course content:", error);
      throw error;
    }
  };

export const generateTopics = async (topic: string):Promise<string> => {
    
    
    try {
      const response = await generateWithAI({
        prompt: topicsBuilderPrompt({ topic }),
        schema: topicsBuilderPromptConfig.responseSchema,
        thinkingBudget: 0,
      });
  
      
      return response;
    } catch (error) {
      console.error("Failed to generate topics:", error);
      throw error;
    }
  };
import { Type } from "@google/genai";

export const courseBuilderPrompt = ({ selectedTopics }: { selectedTopics: string[] }) => {
    return `
  User wants to learn about the following topics:
  - ${selectedTopics.map((topic, index) => `${index + 1}. ${topic}`).join("\n- ")}
  - Create 2 courses with course name, description, and 3 chapters each.
  - Add chapters with tutorial content (topic, explain, code, example).
  - Add a banner image from ['banner1.png', 'banner2.png', 'banner3.png', 'banner4.png'].
  - Explain the chapter content as a detailed tutorial.
  - Generate 5 quizzes, 10 flashcards, and 5 questions and answers.
  - Output should be valid JSON only with:
    
    "Courses": [{
      "courseTitle": <Course Title>,
      "description": <Course Description>,
      "banner_image": <banner1.png>,
      "Chapters": [{
        "chapterName": <Chapter 1: ---->,
        "content": [
          {
            "topic": <Topic name in 2 to 4 words>,
            "explain": <detailed explanations for tutorial>,
            "code": <code example or null>,
            "example": <example or null>
          }
        ]
      }],
      "quizzes": [{
        "question": <What is Python?>,
        "options": [a, b, c, d],
        "correctAns": <correct answer>
      }],
      "flashcards": [{
        "front": <question>,
        "back": <answer>
      }],
      "qa": [{
        "question": <question>,
        "answer": <answer>
      }],
      "projects": [{
        "title": <Project title>,
        "description": <Project description>
      }]
    }]
    `.trim();
  };
  


 
 
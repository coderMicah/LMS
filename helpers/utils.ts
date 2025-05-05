import { Course } from "@/types";
import { DocumentData } from "firebase/firestore";

export const isValidCourse = (data: DocumentData): data is Course => {
    return (
      typeof data.courseTitle === "string" &&
      typeof data.description === "string" &&
      typeof data.banner_image === "string" &&
      typeof data.createdAt === "number" &&
      typeof data.createdBy === "string" &&
      Array.isArray(data.Chapters) &&
      Array.isArray(data.quizzes) &&
      Array.isArray(data.flashcards) &&
      Array.isArray(data.projects) &&
      Array.isArray(data.qa)
      // Array.isArray(data.completedChapter) 
    );
  };
  
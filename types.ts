export interface IUserData {
    name: string
    email: string
    member: boolean
    user: string | undefined
}

export type ChapterContent = {
    topic: string;
    explain: string;
    code: string | null;
    example: string | null;
    // docId:string
};

export type Chapter = {
    chapterName: string;
    content: ChapterContent[];
};

type Flashcard = {
    front: string;
    back: string;
};

type QA = {
    question: string;
    answer: string;
};

type Quiz = {
    question: string;
    options: string[];
    correctAns: string;
};

type Project = {
    title: string;
    description: string;
};

export type Course = {
    courseTitle: string;
    description: string;
    banner_image: string;
    createdAt: number;
    createdBy: string;
    docId: string;
    Chapters: Chapter[];
    flashcards: Flashcard[];
    qa: QA[];
    quizzes: Quiz[];
    projects: Project[];
    completedChapter:string[]
};

export type CourseData = {
    Courses: Course[];
};

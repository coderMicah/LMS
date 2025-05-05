import { ImageSourcePropType } from "react-native";

export interface IPracticeOption{
    name:string;
    image:ImageSourcePropType | undefined;
    icon:ImageSourcePropType | undefined;
}

export const practiceOption :IPracticeOption[] = [
    {
        name: "Quiz",
        image: require("@assets/images/quizz.png"),
        icon:require("@assets/images/quiz.png"),
    },
    {
        name: "Flashcard",
        image: require("@assets/images/flashcard.png"),
        icon:require("@assets/images/layers.png"),
    },
    {
        name: "Question & Answers",
        image: require("@assets/images/notes.png"),
        icon:require("@assets/images/qa.png"),
    },
]


export const imageAssets: { [key: string]: ImageSourcePropType | undefined } = {
    "banner1.png": require("@assets/images/banner1.png"),
    "banner2.png": require("@assets/images/banner2.png"),
    "banner3.png": require("@assets/images/banner3.png"),
    "banner4.png": require("@assets/images/banner4.png"),
    "banner5.png": require("@assets/images/banner5.png"),
    // "/banner6.png": require("@assets/images/banner6.png")
};
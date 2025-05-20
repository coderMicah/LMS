import {
  View,
  Image,
  Pressable,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as Progress from "react-native-progress";
import { useLocalSearchParams } from "expo-router";
import { Course } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import Button from "@/components/ui/Button";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

type QuizResult = {
  userChoice: string;
  isCorrect: boolean;
  question: string;
  correctAns: string;
};

const Quiz = () => {
  const { courseParams } = useLocalSearchParams();
  const course = JSON.parse(courseParams as string) as Course;
  const quiz = course.quizzes;
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [result, setResult] = useState<{ [key: number]: QuizResult }>({});
  const [isLoading, setIsLoading] = useState(false);

  const getProgress = (currentPage: number) => {
    const progress = currentPage / quiz.length;
    return progress;
  };

  const onOptionSelect = (choice: string) => {
    setResult((prev) => ({
      ...prev,
      [currentPage]: {
        userChoice: choice,
        isCorrect: choice === quiz[currentPage].correctAns,
        question: quiz[currentPage].question,
        correctAns: quiz[currentPage].correctAns,
      },
    }));
  };

  const onQuizFinish = async () => {
    setIsLoading(true);
    try {
      await updateDoc(doc(db, "Courses", course.docId), { quizResult: result });
      setIsLoading(false);
    } catch (error) {
      console.log("Error updating quiz result: ", error);
      setIsLoading(false);
    }
  };
  return (
    <View>
      <Image
        source={require("@assets/images/wave.png")}
        style={{ height: 800, width: "100%" }}
      />
      <View style={{ position: "absolute", padding: 25, width: "100%" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Pressable>
            <Ionicons name="arrow-back" size={30} color="white" />
          </Pressable>

          <Text
            style={{
              fontFamily: "Outfit-Bold",
              fontSize: 25,
              color: Colors.WHITE,
            }}
          >
            {currentPage + 1} of {quiz.length} Questions
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <Progress.Bar
            height={10}
            width={Dimensions.get("window").width * 0.85}
            progress={getProgress(currentPage)}
            color={Colors.WHITE}
          />
        </View>

        <View
          style={{
            padding: 25,
            backgroundColor: Colors.WHITE,
            marginTop: 30,
            height: Dimensions.get("screen").height * 0.65,
            elevation: 1,
            shadowColor: Colors.BLACK,
            borderRadius: 20,
          }}
        >
          <Text style={{ fontSize: 25, fontFamily: "Outfit-Bold" }}>
            {quiz[currentPage].question}
          </Text>
          {quiz[currentPage].options.map((option, index) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedOption(index);
                onOptionSelect(option);
              }}
              key={index}
              style={{
                marginTop: 10,
                padding: 10,
                borderWidth: 1,
                borderRadius: 15,
                borderColor:
                  selectedOption === index ? Colors.GREEN : Colors.GRAY,
                backgroundColor:
                  selectedOption === index ? Colors.LIGHT_GREEN : Colors.WHITE,
              }}
            >
              <Text style={{ fontFamily: "Outfit", fontSize: 20 }}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {selectedOption?.toString() && quiz.length - 1 > currentPage && (
          <Button
            text={"Next"}
            onPress={() => {
              setCurrentPage(currentPage + 1);
              setSelectedOption(null);
            }}
            loading={false}
          />
        )}

        {selectedOption?.toString() && quiz.length - 1 === currentPage && (
          <Button
            text={"Finish"}
            loading={isLoading}
            onPress={() => onQuizFinish()}
          />
        )}
      </View>
    </View>
  );
};

export default Quiz;

import { View, Text, Image, Pressable } from "react-native";
import { imageAssets } from "@/constants/Option";
import { Course } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import Button from "../ui/Button";
import { router } from "expo-router";

const Intro = ({ course }: { course: Course }) => {
  return (
    
    <View>
      <Pressable
        style={{ position: "absolute", zIndex: 10, padding: 10 }}
        onPress={() => {router.replace("/")}}
      >
        <Ionicons name="arrow-back" size={32} />
      </Pressable>
      <Image
        source={imageAssets[course.banner_image]}
        style={{ width: "100%", height: 280 }}
      />

      <View style={{ padding: 20 }}>
        <Text style={{ fontFamily: "Outfit-Bold", fontSize: 25 }}>
          {course.courseTitle}
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
            marginTop: 4,
          }}
        >
          <Ionicons name="book-outline" size={16} color={Colors.BLACK} />
          <Text
            style={{
              fontFamily: "Outfit",
              fontSize: 18,
            }}
          >
            {course.Chapters.length} Chapters
          </Text>
        </View>

        <Text
          style={{ fontFamily: "Outfit-Bold", fontSize: 18, marginTop: 24 }}
        >
          Description:
        </Text>
        <Text
          style={{
            fontFamily: "Outfit",
            fontSize: 16,
            marginTop: 4,
            color: Colors.GRAY,
          }}
        >
          {course.description}
        </Text>
        <Button text={"Start Now"} onPress={() => {}} loading={false} />
      </View>
    </View>
  );
};

export default Intro;

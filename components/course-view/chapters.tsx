import React from "react";
import { View, Text, FlatList } from "react-native";
import { Chapter, Course } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const Chapters = ({ course }: { course: Course }) => {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: "Outfit-Bold", fontSize: 25 }}>Chapters</Text>
      <FlatList
        data={course.Chapters}
        renderItem={({ item, index }: { item: Chapter; index: number }) => (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 18,
              marginTop: 10,
              borderWidth: 0.5,
              borderRadius: 10,
              backgroundColor: Colors.BG_GRAY,
            }}
            key={index}
          >
            <Text style={{ fontFamily: "Outfit", fontSize: 20 }}>
              {item.chapterName}
            </Text>
            <Ionicons name="play" size={20} color={Colors.PRIMARY} />
          </View>
        )}
      />
    </View>
  );
};

export default Chapters;

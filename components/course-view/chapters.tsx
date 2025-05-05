import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Chapter, Course } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { router } from "expo-router";

const Chapters = ({ course }: { course: Course }) => {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: "Outfit-Bold", fontSize: 25 }}>Chapters</Text>
      <FlatList
        data={course.Chapters}
        renderItem={({ item, index }: { item: Chapter; index: number }) => {
         
          return (
            <TouchableOpacity
              key={index}
              onPress={() =>
                router.push({
                  // @ts-ignore
                  pathname: "/chapter-view",
                  params: {
                    chapterParams: JSON.stringify(item),
                    docId: course.docId,
                    chapterIndex: index,
                  },
                })
              }
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
            >
              <Text
                style={{ fontFamily: "Outfit", fontSize: 18, maxWidth: "90%" }}
              >
                {item.chapterName}
              </Text>
             
              {course.completedChapter && course.completedChapter.includes(String(index)) ? (
                <>
                  <Text>{course.completedChapter.includes(String(index))}</Text>
                  <Ionicons
                    name="checkmark-circle"
                    size={20}
                    color={Colors.GREEN}
                  />
                </>
              ) : (
                <Ionicons name="play" size={20} color={Colors.PRIMARY} />
              )}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Chapters;

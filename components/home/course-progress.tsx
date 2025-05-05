import { View, Text } from "react-native";
import React from "react";
import { FlatList } from "react-native";
import { Course } from "@/types";
import { Image } from "react-native";
import { imageAssets } from "@/constants/Option";
import Colors from "@/constants/Colors";
import * as Progress from "react-native-progress";

const CourseProgress = ({ courseList }: { courseList: Course[] }) => {
  return (
    <View style={{ marginTop: 15 }}>
      <Text style={{ fontFamily: "Outfit-Bold", fontSize: 25 }}>Progres</Text>

      <FlatList
        data={courseList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }: { item: Course; index: number }) => (
          <View
            key={index}
            style={{
              marginHorizontal: index === 0 ? 0 : 7,
              padding: 15,
              backgroundColor: Colors.WHITE,
              width: 250,
              borderRadius: 15,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Image
                source={imageAssets[item.banner_image]}
                style={{ width: 60, height: 60, borderRadius: 8 }}
              />
              <View style={{ flex: 1 }}>
                <Text
                  style={{ fontFamily: "Outfit-Bold", fontSize: 17 }}
                  numberOfLines={2}
                >
                  {item.courseTitle}
                </Text>
                <Text style={{ fontFamily: "Outfit", fontSize: 15 }}>
                  {item.Chapters.length} Chapters
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Progress.Bar progress={getCompletedChapters(item)} width={225} />
              <Text style={{ fontFamily: "Outfit", marginTop: 3 }}>
                {item.completedChapter.length ?? 0} out of{" "}
                {item.Chapters.length} chapters completed
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default CourseProgress;

const getCompletedChapters = (item: Course) => {
  return item.completedChapter.length / item.Chapters.length;
};

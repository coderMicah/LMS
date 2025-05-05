import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { Course } from "@/types";
import { IPracticeOption } from "@/constants/Option";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface props {
  courseList: Course[];
  option: IPracticeOption;
}

const CourseGrid = ({ courseList, option }: props) => {
  return (
    <View>
      <FlatList
        data={courseList}
        numColumns={2}
        style={{ padding: 20 }}
        renderItem={({ item, index }: { item: Course; index: number }) => (
          <View
            key={index}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 15,
              backgroundColor: Colors.WHITE,
              margin: 7,
              borderRadius: 10,
              elevation: 1,
              shadowColor: Colors.BLACK,
            }}
          >
            <Ionicons
              name="checkmark-circle"
              size={20}
              color={Colors.GRAY}
              style={{ position: "absolute", right: 10, top: 10 }}
            />
            <Image
              source={option.icon}
              style={{ width: "100%", height: 70, objectFit: "contain" }}
            />
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Outfit",
                marginTop: 7,
              }}
            >
              {item.courseTitle}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default CourseGrid;

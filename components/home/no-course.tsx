import { View, Text, Image } from "react-native";
import React from "react";
import Button from "../ui/Button";
import { router } from "expo-router";

const NoCourse = () => {
  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={require("@assets/images/book.png")}
        style={{ height: 200, width: 200 }}
      />
      <Text
        style={{
          fontFamily: "Outfit-Bold",
          fontSize: 20,
          textAlign: "center",
          textTransform: "capitalize",
        }}
      >
        You don't have any courses
      </Text>

      <Button
        text="Create New Course"
        onPress={() => {
          router.push("/add-course");
        }}
        loading={false}
      />
      <Button
        loading={false}
        type="outline"
        text="Explore Existing Courses"
        onPress={() => {}}
      />
    </View>
  );
};

export default NoCourse;

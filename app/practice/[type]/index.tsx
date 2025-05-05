import { View, Text, Image, Pressable, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { imageAssets, IPracticeOption, practiceOption } from "@/constants/Option";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { useUserDetail } from "@/context/UserDetailContext";
import CourseGrid from "@/components/practice/coursegrid";
import { Course } from "@/types";
import { isValidCourse } from "@/helpers/utils";

const PracticeTypeHome = () => {
  const { type } = useLocalSearchParams();
  const { userDetail } = useUserDetail();
  const option = practiceOption.find((opt) => opt.name === type) ;

  const [loading, setLoading] = useState(false);
  const [courseList, setCourseList] = useState<Course[]>([]);

  useEffect(() => {
    if (userDetail) {
      getCourseList();
    }
  }, [userDetail]);

  const getCourseList = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "Courses"),
        where("createdBy", "==", userDetail.email),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const courseData = doc.data() as Course;

        if (courseData && isValidCourse(courseData)) {
          setCourseList((prev: Course[]) => {
            const courseExists = prev.some(
              (course) => course.courseTitle === courseData.courseTitle
            );

            if (!courseExists) {
              return [...prev, courseData];
            }
            return prev;
          });
        } else {
          console.error("Invalid course data:", courseData);
        }
      });
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Image source={option?.image} style={{ width: "100%", height: 200 }} />
      <View
        style={{
          position: "absolute",
          padding: 10,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Pressable
          style={{ display: "flex" }}
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="arrow-back" size={32} />
        </Pressable>
        <Text
          style={{
            fontFamily: "Outfit-Bold",
            fontSize: 30,
            color: Colors.WHITE,
          }}
        >
          {option?.name}
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={Colors.PRIMARY}
          style={{ marginTop: 50 }}
        />
      ) : (
        <CourseGrid courseList={courseList} option={option!}/>
      )}
    </View>
  );
};

export default PracticeTypeHome;

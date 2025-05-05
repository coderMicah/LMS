import { View, Platform, FlatList, Image } from "react-native";
import HomeHeader from "@/components/home/header";
import Colors from "@/constants/Colors";
import NoCourse from "@/components/home/no-course";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { useUserDetail } from "@/context/UserDetailContext";
import CourseList from "@/components/home/course-list";
import { Course } from "@/types";
import PracticeSection from "@/components/home/practice-section";
import CourseProgress from "@/components/home/course-progress";
import { isValidCourse } from "@/helpers/utils";

const Home = () => {
  const { userDetail } = useUserDetail();
  const [courseList, setCourseList] = useState<Course[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (userDetail) {
      getCourseList();
    }
  }, [userDetail]);

  const getCourseList = async () => {
    setRefreshing(true);
    setCourseList([]);
    const q = query(
      collection(db, "Courses"),
      where("createdBy", "==", userDetail.email)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const courseData = doc.data() as Course;

      if (courseData && isValidCourse(courseData)) {
        // Check if the course already exists in the list based on a unique property (e.g., courseTitle or courseId)
        setCourseList((prev: Course[]) => {
          // Add the course only if it's not already in the list
          const courseExists = prev.some(
            (course) => course.courseTitle === courseData.courseTitle
          );

          if (!courseExists) {
            return [...prev, courseData]; // Add the new course if not already in the list
          }
          return prev; // Return the list unchanged if the course already exists
        });
      } else {
        console.error("Invalid course data:", courseData);
      }
    });

    setRefreshing(false);
  };

  return (
    <FlatList
      data={[]}
      refreshing={refreshing}
      onRefresh={() => getCourseList()}
      renderItem={() => null}
      ListHeaderComponent={
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.WHITE,
          }}
        >
          <Image
            source={require("@assets/images/wave.png")}
            style={{ position: "absolute", width: "100%", height: 700 }}
          />
          <View
            style={{
              padding: 25,
              paddingTop: Platform.OS === "ios" ? 45 : undefined,
            }}
          >
            <HomeHeader />
            {courseList.length === 0 ? (
              <NoCourse />
            ) : (
              <View>
                <CourseProgress courseList={courseList} />
                <PracticeSection />
                <CourseList courseList={courseList} />
              </View>
            )}
          </View>
        </View>
      }
    />
  );
};

export default Home;


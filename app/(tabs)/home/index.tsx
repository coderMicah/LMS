import { View, Platform } from "react-native";
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

const Home = () => {
  const { userDetail } = useUserDetail();
  const [courseList, setCourseList] = useState<Course[]>([]);

  useEffect(() => {
    if (userDetail) {
      getCourseList();
    }
  }, [userDetail]);

  const getCourseList = async () => {
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
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: Platform.OS === "ios" ? 45 : undefined,
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    >
      <HomeHeader />
      {courseList.length === 0 ? (
        <NoCourse />
      ) : (
        <View>
          <CourseProgress courseList={courseList}/>
          <PracticeSection />
          <CourseList courseList={courseList} />
        </View>
      )}
    </View>
  );
};

export default Home;

const isValidCourse = (data: DocumentData): data is Course => {
  return (
    typeof data.courseTitle === "string" &&
    typeof data.description === "string" &&
    typeof data.banner_image === "string" &&
    typeof data.createdAt === "number" &&
    typeof data.createdBy === "string" &&
    Array.isArray(data.Chapters) &&
    Array.isArray(data.quizzes) &&
    Array.isArray(data.flashcards) &&
    Array.isArray(data.projects) &&
    Array.isArray(data.qa)
  );
};

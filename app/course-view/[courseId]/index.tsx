import { FlatList, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Course } from "@/types";
import Intro from "@/components/course-view/intro";
import Chapters from "@/components/course-view/chapters";
import Colors from "@/constants/Colors";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { useEffect, useState } from "react";

const CourseView = () => {
  const { courseParams, courseId } = useLocalSearchParams();
  const [courseEntry, setCourseEntry] = useState<Course>();
  // const course = JSON.parse(courseParams as string) as Course;

  useEffect(() => {
    if (!courseParams) {
      getCourseById();
    } else {
      setCourseEntry(JSON.parse(courseParams as string) as Course);
    }
  }, [courseId]);

  const getCourseById = async () => {
    const docRef = await getDoc(doc(db, "Courses", String(courseId)));
    const courseData = docRef.data() as Course;
    console.log(courseData);
    
    setCourseEntry(courseData);
  };

  if (courseEntry)
    return (
      <FlatList
        data={[]}
        renderItem={null}
        ListHeaderComponent={() => (
          <View style={{ backgroundColor: Colors.WHITE }}>
            <Intro course={courseEntry} />
            <Chapters course={courseEntry} />
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    );
};

export default CourseView;

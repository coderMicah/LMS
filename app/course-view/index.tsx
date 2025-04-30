import { FlatList, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Course } from "@/types";
import Intro from "@/components/course-view/intro";
import Chapters from "@/components/course-view/chapters";
import Colors from "@/constants/Colors";

const CourseView = () => {
  const { courseParams } = useLocalSearchParams();
  const course = JSON.parse(courseParams as string) as Course;

  return (
    <FlatList
      data={[]}
      renderItem={null}
      ListHeaderComponent={() => (
        <View style={{ backgroundColor: Colors.WHITE }}>
          <Intro course={course} />
          <Chapters course={course} />
        </View>
      )}
      showsVerticalScrollIndicator={false}

    />
  );
};

export default CourseView;

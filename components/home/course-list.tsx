import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { imageAssets } from "@/constants/Option";
import { Course } from "@/types";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const CourseList = ({ courseList }: { courseList: Course[] }) => {
  return (
    <View style={{ marginTop: 15 }}>
      <Text style={{ fontFamily: "Outfit-Bold", fontSize: 25 }}>Course</Text>

      <FlatList
        data={courseList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }: { item: Course; index: number }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                // @ts-ignore
                pathname: "/course-view",
                params: { courseParams: JSON.stringify(item) },
              })
            }
            key={index}
            style={styles.courseContainer}
          >
            <Image
              source={imageAssets[item.banner_image]}
              style={{ width: "100%", height: 150, borderRadius: 15 }}
            />
            <Text
              style={{
                fontFamily: "Outfit-Bold",
                fontSize: 18,
                marginTop: 10,
                // flexWrap: "wrap",
                // width: 260,
              }}
              numberOfLines={2} // Limit to 2 lines
              ellipsizeMode="tail" // Show an ellipsis at the end of the text if it's too long
            >
              {item.courseTitle}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
                marginTop: 4,
              }}
            >
              <Ionicons name="book-outline" size={16} color={Colors.BLACK} />
              <Text
                style={{
                  fontFamily: "Outfit",
                }}
              >
                {item.Chapters.length} Chapters
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CourseList;
const styles = StyleSheet.create({
  courseContainer: {
    padding: 10,
    backgroundColor: Colors.BG_GRAY,
    margin: 6,
    borderRadius: 15,
    width: 250,
  },
});

import { View, Text, Dimensions, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Chapter } from "@/types";
import Colors from "@/constants/Colors";
import Button from "@/components/ui/Button";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

const ChapterView = () => {
  const { chapterParams, docId, chapterIndex } = useLocalSearchParams();
  const courseChapters = JSON.parse(chapterParams as string) as Chapter;

  const [currentPage, setCurrentPage] = useState(0);
  const [loader, setLoader] = useState(false);

  const getProgress = (currentPage: number) => {
    const percentage = currentPage / courseChapters.content.length;
    return percentage;
  };

  const onChapterComplete = async () => {
    //save chapter complete
    setLoader(true);
    await updateDoc(doc(db, "Courses", docId as string), {
      completedChapter: arrayUnion(chapterIndex),
    });
    setLoader(false);

    // go back
    //@ts-ignore
    router.replace(`/course-view/${docId as string}`);
  };

  return (
    <View style={{ padding: 20, backgroundColor: Colors.WHITE, flex: 1 }}>
      <Progress.Bar
        progress={getProgress(currentPage)}
        width={Dimensions.get("screen").width * 0.85}
      />

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontFamily: "Outfit-Bold", fontSize: 25 }}>
          {courseChapters.content[currentPage].topic}
        </Text>
        <Text style={{ fontFamily: "Outfit", fontSize: 18, marginTop: 7 }}>
          {courseChapters.content[currentPage].explain}
        </Text>
        {courseChapters.content[currentPage].code && (
          <Text
            style={[
              styles.codeExampleText,
              { backgroundColor: Colors.BLACK, color: Colors.WHITE },
            ]}
          >
            {courseChapters.content[currentPage].code}
          </Text>
        )}
        {courseChapters.content[currentPage].example && (
          <Text style={styles.codeExampleText}>
            {courseChapters.content[currentPage].example}
          </Text>
        )}
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 20,
          left: 25,
          right: 0,
          width: "100%",
          alignItems: "center",
        }}
      >
        {courseChapters.content.length - 1 !== currentPage ? (
          <Button
            text={"Next"}
            onPress={() => setCurrentPage(currentPage + 1)}
            loading={false}
          />
        ) : (
          <Button
            text={"Finish"}
            onPress={() => onChapterComplete()}
            loading={loader}
          />
        )}
      </View>
    </View>
  );
};

export default ChapterView;

const styles = StyleSheet.create({
  codeExampleText: {
    padding: 15,
    backgroundColor: Colors.BG_GRAY,
    borderRadius: 15,
    fontFamily: "Outfit",
    fontSize: 18,
    marginTop: 15,
  },
});

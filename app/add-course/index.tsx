import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Colors from "@/constants/Colors";

import { generateCourse, generateTopics } from "@/ai";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { create } from "domain";
import { useUserDetail } from "@/context/UserDetailContext";
import { router } from "expo-router";

const AddCourse = () => {
  const { userDetail } = useUserDetail();
  const [loading, setLoading] = useState(false);
  const [courseGenerating, setCourseGenerating] = useState(false);
  const [promptInput, setPromptInput] = useState("");
  const [topics, setTopics] = useState<string[]>([]);

  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const onSelectTopic = (topic: string) => {
    const topicExists = selectedTopics.find((t) => t === topic);
    if (!topicExists) {
      setSelectedTopics((prev) => [...prev, topic]);
    } else {
      const topics = selectedTopics.filter((t) => t !== topic);
      setSelectedTopics(topics);
    }
  };

  const isSelected = (topic: string) => {
    const selection = selectedTopics.find((t) => t === topic);
    return selection ? true : false;
  };

  const onGenarateTopic = async () => {
    setLoading(true);
    // Generate Course With AI
    const topics = await generateTopics(promptInput);
    // const topics = await generateTopicsWithAI({ topic: promptInput });
    if (topics) {
      setTopics(JSON.parse(topics));
    }

    setLoading(false);
  };

  const onGenarateCourse = async () => {
    setCourseGenerating(true);

    try {
      const courses = await generateCourse(selectedTopics);
       
      //Save Course to DB
      courses.Courses?.forEach(async (course: any) => {
        const docId = Date.now().toString() ;
        await setDoc(doc(db, "Courses",docId), {
          ...course,
          createdAt: Date.now(),
          createdBy: userDetail?.email,
          docId:docId
        });
      });
      setCourseGenerating(false);

      router.push("/(tabs)/home");
    } catch (error) {
      setCourseGenerating(false);
      console.error("Error generating course:", error);
    }
  };

  return (
    <ScrollView style={{ padding: 25, flex: 1 }}>
      <Text style={{ fontFamily: "Outfit-Bold", fontSize: 30 }}>
        Create New Course
      </Text>
      <Text style={{ fontFamily: "Outfit", fontSize: 22 }}>
        What do you want to learn Today
      </Text>
      <Text
        style={{
          fontFamily: "Outfit",
          fontSize: 16,
          marginTop: 8,
          color: Colors.GRAY,
        }}
      >
        Write what course you want to create(E.g.Learn React Native,Learn
        JAVA,etc...)
      </Text>

      <TextInput
        style={styles.textInput}
        numberOfLines={3}
        multiline={true}
        placeholder="Ex.Learn Python"
        onChangeText={(value) => setPromptInput(value)}
      />
      <Button
        text="Generate"
        onPress={() => {
          onGenarateTopic();
        }}
        loading={loading}
      />

      {topics.length > 0 && (
        <>
          <View style={{ marginTop: 15 }}>
            <Text style={{ fontFamily: "Outfit", fontSize: 20 }}>
              Select All The Topics You Want to Include In This Course
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            {topics.map((topic, _) => (
              <Pressable key={_} onPress={() => onSelectTopic(topic)}>
                <Text
                  style={{
                    padding: 7,
                    borderWidth: 0.5,
                    borderRadius: 99,
                    paddingHorizontal: 15,
                    backgroundColor: isSelected(topic)
                      ? Colors.PRIMARY
                      : undefined,
                    color: isSelected(topic) ? Colors.WHITE : undefined,
                    borderColor: isSelected(topic) ? Colors.WHITE : undefined,
                  }}
                >
                  {topic}
                </Text>
              </Pressable>
            ))}
          </View>

          <Button
            type="fill"
            onPress={() => onGenarateCourse()}
            text="Generate Course"
            loading={courseGenerating}
          />
        </>
      )}
    </ScrollView>
  );
};

export default AddCourse;

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
    height: 100,
    marginTop: 15,
    alignItems: "flex-start",
  },
});

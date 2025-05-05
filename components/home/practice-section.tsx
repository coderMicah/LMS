import Colors from "@/constants/Colors";
import { IPracticeOption, practiceOption } from "@/constants/Option";
import { router } from "expo-router";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";

const PracticeSection = () => {
  return (
    <View style={{ marginTop: 15 }}>
      <Text style={{ fontFamily: "Outfit-Bold", fontSize: 25 }}>Practice</Text>
      <View>
        <FlatList
          numColumns={3}
          data={practiceOption}
          renderItem={({
            item,
            index,
          }: {
            item: IPracticeOption;
            index: number;
          }) => {
            const isMiddle = index % 3 === 1;
            return (
              <TouchableOpacity
               onPress={() => router.push(`/practice/${item.name}`)}
                key={index}
                style={{
                  flex: 1,
                  marginHorizontal: isMiddle ? 5 : 0,
                  aspectRatio: 1,
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    backgroundColor: Colors.BLACK,
                    zIndex: 10,
                    borderRadius: 15,
                    opacity: 0.1,
                  }}
                />
                <Image
                  source={item.image}
                  style={{
                    width: "100%",
                    height: "100%",
                    maxHeight: 160,
                    borderRadius: 15,
                  }}
                />

                <Text
                  style={{
                    position: "absolute",
                    padding: 15,
                    color: Colors.WHITE,
                    fontSize: 15,
                    fontFamily: "Outfit",
                    zIndex: 20,
                  }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default PracticeSection;

import { View, Platform } from "react-native";
import HomeHeader from "@/components/home/header";
import Colors from "@/constants/Colors";
import NoCourse from "@/components/home/no-course";

const Home = () => {
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
      <NoCourse/>
    </View>
  );
};

export default Home;

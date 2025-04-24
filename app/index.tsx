import { auth, db } from "@/config/firebaseConfig";
import Colors from "@/constants/Colors";
import { useUserDetail } from "@/context/UserDetailContext";
import { IUserData } from "@/types";
import { router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const index = () => {
  const { setUserDetail } = useUserDetail();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.email) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.email));
          const data = userDoc.data();
  
          if (data) {
            const userData: IUserData = {
              name: data.name ?? "",
              email: data.email ?? "",
              member: data.member ?? false,
              user: data.user ?? undefined,
            };
            setUserDetail(userData);
            router.replace("/(tabs)/home")
          } else {
            console.error("No user data found in Firestore for:", user.email);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.error("User is not logged in or email is missing");
      }
    });
  
    return () => unsubscribe(); // cleanup on unmount
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <Image
        source={require("@assets/images/landing.png")}
        style={{ width: "100%", height: 300 }}
      />

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          padding: 25,
          backgroundColor: Colors.PRIMARY,
          height: "100%",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          gap: 20,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontFamily: "Outfit-Bold",
            textAlign: "center",
            color: Colors.WHITE,
          }}
        >
          Welcome To Coaching Masters
        </Text>

        <Text
          style={{
            fontSize: 20,
            fontFamily: "Outfit",
            textAlign: "center",
            color: Colors.WHITE,
          }}
        >
          Transform your ideas into the form of enganging content, effortlessly
          with AI
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/(auth)/signUp")}
          style={styles.button}
        >
          <Text style={[styles.buttonText, { color: Colors.PRIMARY }]}>
            Get Started
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(auth)/signIn")}
          style={[
            styles.button,
            {
              backgroundColor: Colors.PRIMARY,
              borderColor: Colors.WHITE,
              borderWidth: 1,
            },
          ]}
        >
          <Text style={[styles.buttonText, { color: Colors.WHITE }]}>
            Already Have An Account?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    textAlign: "center",
    padding: 15,
    backgroundColor: Colors.WHITE,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "Outfit",
  },
});

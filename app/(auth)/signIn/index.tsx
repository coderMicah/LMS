import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { router } from "expo-router";
import { auth, db } from "@/config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useUserDetail } from "@/context/UserDetailContext";
import { IUserData } from "@/types";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUserDetail } = useUserDetail();

  const signIn = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        // Signed in
        const user = res.user;
        console.log(user);
        await getUserDetail();
        setLoading(false);
        router.replace("/(tabs)/home")
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        setLoading(false);
        ToastAndroid.show("Incorrect Email & Password", ToastAndroid.BOTTOM);
      });
  };

  const getUserDetail = async () => {
    const result = await getDoc(doc(db, "users", email));
    const data = result.data();

    if (!data) {
      console.error("No user data found for:", email);
      return;
    }

    const userData: IUserData = {
      name: data.name ?? "",
      email: data.email ?? "",
      member: data.member ?? false,
      user: data.user ?? undefined,
    };

    setUserDetail(userData);
    console.log(result.data());
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        // paddingTop: 100,
        paddingHorizontal: 25,
        justifyContent: "center",
        backgroundColor: Colors.WHITE,
      }}
    >
      <Image
        source={require("@assets/images/logo.png")}
        style={{ width: 180, height: 180, alignSelf: "center" }}
      />
      <Text style={{ fontFamily: "Outfit-Bold", fontSize: 30 }}>
        Welcome Back
      </Text>

      <TextInput
        placeholder="Email"
        onChangeText={(value) => setEmail(value)}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(value) => setPassword(value)}
        secureTextEntry={true}
        style={styles.textInput}
      />

      <TouchableOpacity
        onPress={() => signIn()}
        disabled={loading}
        style={{
          marginTop: 38,
          backgroundColor: Colors.PRIMARY,
          padding: 20,
          borderWidth: 1,
          borderColor: Colors.PRIMARY,
          borderRadius: 8,
          width: "100%",
          alignItems: "center",
        }}
      >
        {loading ? (
          <ActivityIndicator size={"large"} color={Colors.WHITE} />
        ) : (
          <Text
            style={{ fontSize: 24, fontFamily: "Outfit", color: Colors.WHITE }}
          >
            Sign In{" "}
          </Text>
        )}
      </TouchableOpacity>
      <View
        style={{ display: "flex", flexDirection: "row", marginTop: 20, gap: 5 }}
      >
        <Text style={{ fontFamily: "Outfit" }}>Don't Have An Account?</Text>
        <Pressable
          onPress={() => {
            router.push("/(auth)/signUp");
          }}
        >
          <Text style={{ color: Colors.PRIMARY, fontFamily: "Outfit-Bold" }}>
            Create Account
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    width: "100%",
    padding: 15,
    fontSize: 16,
    marginTop: 20,
    borderRadius: 8,
  },
});

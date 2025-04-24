import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { router } from "expo-router";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/config/firebaseConfig";
import { IUserData } from "@/types";
import { useUserDetail } from "@/context/UserDetailContext";

const SignUp = () => {
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);

  const { setUserDetail } = useUserDetail();

  const createNewAccount = () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        const user = res.user;
        console.log(user);

        //save user to db
        await saveUser(user);
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false);
        console.log(errorCode, errorMessage);
      });
  };

  const saveUser = async (user: { uid: string } | null) => {
    const userData: IUserData = {
      name: name,
      email: email,
      member: false,
      user: user?.uid,
    };

    await setDoc(doc(db, "users", email), userData);
    setUserDetail(userData);

    //Navigate to New Screen
    router.replace("/(tabs)/home");
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
        Create New Account
      </Text>

      <TextInput
        placeholder="Full Name"
        onChangeText={(value) => setName(value)}
        style={styles.textInput}
      />
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
        disabled={loading}
        onPress={() => createNewAccount()}
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
            Create Account
          </Text>
        )}
      </TouchableOpacity>
      <View
        style={{ display: "flex", flexDirection: "row", marginTop: 20, gap: 5 }}
      >
        <Text style={{ fontFamily: "Outfit" }}>Already Have An Account?</Text>
        <Pressable
          onPress={() => {
            router.push("/(auth)/signIn");
          }}
        >
          <Text style={{ color: Colors.PRIMARY, fontFamily: "Outfit-Bold" }}>
            Sign In
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUp;
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

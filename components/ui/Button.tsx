import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

interface ButtonProps {
  text: string;
  type?: "fill" | "outline";
  onPress: () => void;
  loading: boolean;
}

const Button = ({ text, type = "fill", onPress, loading }: ButtonProps) => {
  return (
    <TouchableOpacity
      disabled={loading}
      style={{
        padding: 15,
        width: "100%",
        borderRadius: 15,
        marginTop: 15,
        backgroundColor: type === "fill" ? Colors.PRIMARY : Colors.WHITE,
        borderWidth: type == "outline" ? 1 : 0,
        borderColor: type === "outline" ? Colors.PRIMARY : Colors.WHITE,
      }}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator size={"small"}  color={type === "outline" ? Colors.PRIMARY : Colors.WHITE}/>
      ) : (
        <Text
          style={{
            fontSize: 18,
            fontFamily: type === "fill" ? "Outfit-Bold" : "Outfit",
            textAlign: "center",
            color: type === "fill" ? Colors.WHITE : Colors.PRIMARY,
          }}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

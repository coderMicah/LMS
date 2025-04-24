import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useUserDetail } from "@/context/UserDetailContext";
import { Ionicons } from "@expo/vector-icons";

const HomeHeader = () => {
  const { userDetail, setUserDetail } = useUserDetail();
  return (
    <View style={{ display: "flex",flexDirection:"row", justifyContent:"space-between", alignItems:"center" }}>
      <View>
        <Text style={{ fontFamily: "Outfit-Bold", fontSize: 25 }}>
          Hello , {userDetail.name}
        </Text>
        <Text style={{ fontFamily: "Outfit", fontSize: 17 }}>
          Let's get started
        </Text>
      </View>

      <TouchableOpacity>
        <Ionicons name="settings-outline" size={32} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;

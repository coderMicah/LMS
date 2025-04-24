import { UserDetailContextProvider } from "@/context/UserDetailContext";
import {useFonts} from "expo-font"
import {  Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded,error] = useFonts({
    "Outfit": require("@assets/fonts/Outfit-Regular.ttf"),
    "Outfit-Bold": require("@assets/fonts/Outfit-Bold.ttf"),
  })

  useEffect(() => {
    if(loaded || error){
      // After the custom fonts have loaded, 
      // we can hide the splash screen and display the app screen.
        SplashScreen.hideAsync();
    }
  },[loaded,error])

  console.log(error,loaded);
  

  // App waits until fonts are loaded
  if(!loaded && !error) return null  


  return (
    <UserDetailContextProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </UserDetailContextProvider>
  );
}

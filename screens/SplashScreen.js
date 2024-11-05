import { StyleSheet, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { Video } from "expo-av";
import { Colors } from "@/constants/Colors";

const SplashScreen = () => {
  const navigataion = useNavigation();
  // const [showFirstLogo, setShowFirstLogo] = useState(true);

  // useEffect(() => {
  //   const firstLogoTimer = setTimeout(() => {
  //     setShowFirstLogo(false);
  //   }, 2000);

  //   const secondLogoTimer = setTimeout(() => {
  //     navigataion.navigate("SignIn");
  //   }, 4000);

  //   return () => {
  //     clearTimeout(firstLogoTimer);
  //     clearTimeout(secondLogoTimer);
  //   };
  // }, [navigataion]);

  const videoEndHandler = () => {
    navigataion.navigate("SignIn");
  };

  return (
    <View style={styles.container}>
      <Video
        source={require("../assets/videos/PrepUp-SplashScreen.mp4")}
        style={styles.video}
        resizeMode={"cover"}
        shouldPlay
        isLooping={false}
        onPlaybackStatusUpdate={(status) => {
          if (status.didJustFinish) {
            videoEndHandler();
          }
        }}
        isMuted
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultBeige,
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  // imageContainer: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   backgroundColor: Colors.defaultBeige,
  // },
  // logo: {
  //   width: 200,
  //   height: 200,
  // },
  // logoWord: {
  //   width: 350,
  //   height: 100,
  // },
});

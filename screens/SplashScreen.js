import { StyleSheet, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import TitleText from "@/components/common/TitleText";

const SplashScreen = () => {
  const [showFirstLogo, setShowFirstLogo] = useState(true);
  const navigataion = useNavigation();

  useEffect(() => {
    const firstLogoTimer = setTimeout(() => {
      setShowFirstLogo(false);
    }, 2000);

    const secondLogoTimer = setTimeout(() => {
      navigataion.navigate("SignIn-preloader");
    }, 4000);

    return () => {
      clearTimeout(firstLogoTimer);
      clearTimeout(secondLogoTimer);
    };
  }, [navigataion]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {showFirstLogo ? (
          <>
            <Image source={require("../assets/images/logo-color.png")} />
          </>
        ) : (
          <>
            <Image
              source={require("../assets/images/logo-wordmark-color.png")}
            />
          </>
        )}
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

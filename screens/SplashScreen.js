import { StyleSheet, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { Colors } from "@/constants/Colors";

const SplashScreen = () => {
  const [showFirstLogo, setShowFirstLogo] = useState(true);
  const navigataion = useNavigation();

  useEffect(() => {
    const firstLogoTimer = setTimeout(() => {
      setShowFirstLogo(false);
    }, 2000);

    const secondLogoTimer = setTimeout(() => {
      navigataion.navigate("SignIn");
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
            <Image source={require("../assets/images/PrepUp-Logo-COLORED.png")} style={styles.logo} />
          </>
        ) : (
          <>
            <Image
              source={require("../assets/images/PrepUp-Logo+Wordmark-COLORED.png")} style={styles.logoWord}
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
    backgroundColor: Colors.defaultBeige,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 220,
    height: 220,
  },
  logoWord: {
    width: 360,
    height: 100,
  }
});

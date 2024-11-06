import { Image, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import TitleText from "@/components/common/TitleText";
import { Colors } from "@/constants/Colors";

const SigninPreloaderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const preloaderTimer = setTimeout(() => {
      // navigation.navigate("SignIn");
    }, 2000);

    return () => {
      clearTimeout(preloaderTimer);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/PrepUp-Logo-COLORED.png")}
          style={styles.image}
        />
      </View>
    </View>
  );
};

export default SigninPreloaderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.disabledBeige,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 12,
    paddingBottom: 0,
  },
  imageContainer: {
    // marginBottom: 50,
  },
  image: {
    width: 130,
    height: 130,
  },
});

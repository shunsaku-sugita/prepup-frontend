import { Image, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import TitleText from "@/components/common/TitleText";

const SigninPreloaderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const preloaderTimer = setTimeout(() => {
      navigation.navigate("SignIn");
    }, 2000);

    return () => {
      clearTimeout(preloaderTimer);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/images/img.png")} />
        <TitleText text="SignIn Preloader" />
      </View>

      {/* <WideButton
        title="Sign In"
        color="white"
        onPress={() => navigation.navigate("SignIn-second")}
      />
      <TouchableOpacity
        style={styles.googleButton}
        // onPress={}
      >
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.createAccountButton}
        onPress={() => navigation.navigate("Registration")}
      >
        <Text style={styles.createButtonText}>Create an Account</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default SigninPreloaderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    rowGap: 12,
    paddingBottom: 0,
  },
  imageContainer: {
    marginBottom: 50,
  },
  // googleButton: {
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "#ddd",
  //   borderRadius: 6,
  //   padding: 10,
  //   width: 340,
  // },
  // googleButtonText: {
  //   fontSize: 16,
  //   fontWeight: "bold",
  // },
  // createAccountButton: {
  //   marginTop: 10,
  // },
  // createButtonText: {
  //   fontSize: 16,
  //   color: "blue",
  // },
});

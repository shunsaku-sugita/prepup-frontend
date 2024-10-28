import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import WideButton from "@/components/common/WideButton";
import { useNavigation } from "expo-router";

const SigninFirstScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/images/img.png")} />
      </View>
      <WideButton
        title="Sign In"
        color="white"
        onPress={() => navigation.navigate("SignIn-second")}
      />
      <TouchableOpacity
        style={styles.googleButton}
        // onPress={}
      >
        <Text style={styles.googleButtonText}>Login with Google Account</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.createAccountButton}
        onPress={() => navigation.navigate("Registration")}
      >
        <Text style={styles.createButtonText}>Create an Account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.homeNavigationButton}
        onPress={() => navigation.navigate("Category")}
      >
        <Text style={styles.homeNavigationText}>Shortcut to Home!</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.homeNavigationButton}
        onPress={() => navigation.navigate("OnboardingOne")}
      >
        <Text style={styles.homeNavigationText}>Shortcut to Onboarding!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SigninFirstScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    rowGap: 12,
    paddingBottom: 50,
  },
  imageContainer: {
    marginBottom: 50,
  },
  googleButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
    borderRadius: 6,
    padding: 10,
    width: 340,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  createAccountButton: {
    marginTop: 10,
  },
  createButtonText: {
    fontSize: 16,
    color: "blue",
  },
  homeNavigationButton: {
    // marginTop: 40,
  },
  homeNavigationText: {
    textDecorationLine: "underline",
  },
});

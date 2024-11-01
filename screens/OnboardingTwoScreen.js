import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import WideButton from "@/components/common/WideButton";
import TitleText from "@/components/common/TitleText";
import { useNavigation } from "expo-router";
import { Colors } from "@/constants/Colors";

const OnboardingTwoScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.mainContents}>
        <View style={styles.imageContainer}>
          <Image source={require("../assets/images/img.png")} />
        </View>
        <View style={styles.titleAndTextContainer}>
          <TitleText text="Job Finder" />
          <Text style={styles.description}>
            A list of tailored job roles based on the user’s current or past
            occupation.
          </Text>
        </View>
        <View style={styles.carouselCircles}>
          <View style={styles.circle} />
          <View style={styles.circleActive} />
          <View style={styles.circle} />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <WideButton
          title="Continue"
          color="white"
          onPress={() => navigation.navigate("OnboardingThree")}
        />
        <TouchableOpacity
          style={styles.simpleButton}
          onPress={() => navigation.navigate("Category")}
        >
          <Text style={styles.simpleButtonText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingTwoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultBeige,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 12,
    paddingTop: 100,
  },
  mainContents: {
    flex: 6,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  imageContainer: {
    marginTop: 50,
    marginBottom: 80,
  },
  carouselCircles: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 16,
  },
  circleActive: {
    width: 16,
    height: 16,
    backgroundColor: Colors.onPressBlue,
    borderRadius: 50,
  },
  circle: {
    width: 16,
    height: 16,
    backgroundColor: Colors.disabledBlue,
    borderRadius: 50,
  },
  titleAndTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    rowGap: 20,
    width: "73%",
  },
  description: {
    fontSize: 16,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    rowGap: 10,
    marginBottom: 50,
  },
  simpleButton: {
    marginTop: 10,
  },
  simpleButtonText: {
    fontSize: 16,
    color: "blue",
  },
});

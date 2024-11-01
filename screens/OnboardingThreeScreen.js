import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import WideButton from "@/components/common/WideButton";
import TitleText from "@/components/common/TitleText";
import { useNavigation } from "expo-router";
import { Colors } from "@/constants/Colors";

const OnboardingThree = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.mainContents}>
        <View style={styles.imageContainer}>
          <Image source={require("../assets/images/onboarding-three.png")} />
        </View>
        <View style={styles.titleAndTextContainer}>
          <TitleText text="S.T.A.R Master" />
          <Text style={styles.description}>
            A set of questions that helps you answer for different situations.
          </Text>
        </View>
        <View style={styles.carouselCircles}>
          <View style={styles.circle} />
          <View style={styles.circle} />
          <View style={styles.circleActive} />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <WideButton
          title="Get Started"
          color="white"
          // need to check if user's info matches to our database
          onPress={() => navigation.navigate("Category")}
        />
      </View>
    </View>
  );
};

export default OnboardingThree;

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
    marginTop: 30,
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
});

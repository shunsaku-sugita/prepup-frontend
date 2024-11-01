import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import WideButton from "@/components/common/WideButton";
import { useNavigation } from "expo-router";
import TitleText from "@/components/common/TitleText";
import { Colors } from "@/constants/Colors";

const RegistrationSuccessScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.mainContents}>
        <View style={styles.imageContainer}>
          <Image source={require("../assets/images/img.png")} />
        </View>
        <View style={styles.titleAndTextContainer}>
          <TitleText text="Registration Successful!" />
          <Text>Your account has been registered.</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <WideButton
          title="Continue"
          color="white"
          // need to check if user's info matches to our database
          onPress={() => navigation.navigate("Onboarding")}
        />
      </View>
    </View>
  );
};

export default RegistrationSuccessScreen;

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
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  titleAndTextContainer: {
    marginBottom: 50,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 20,
    width: 340,
  },
  imageContainer: {
    marginBottom: 40,
  },
  buttonContainer: {
    flex: 1,
    marginBottom: 50,
  },
});

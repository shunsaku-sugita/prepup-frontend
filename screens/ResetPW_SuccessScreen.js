import { StyleSheet, Text, View, Image } from "react-native";
import React, { useContext } from "react";
import WideButton from "@/components/common/WideButton";
import { useNavigation } from "expo-router";
import TitleText from "@/components/common/TitleText";
import { Colors } from "@/constants/Colors";
import { AppContext } from "@/store/app-context";

const ResetPW_SuccessScreen = () => {
  const navigation = useNavigation();
  const { fontsLoaded } = useContext(AppContext);
  if (!fontsLoaded) {
    return null; // return null if fonts aren't loaded
  }

  return (
    <View style={styles.container}>
      <View style={styles.mainContents}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/ResetPasswordSuccess.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.titleAndTextContainer}>
          <TitleText text="Well Done!" />
          <Text style={styles.text}>Change has been successfully done.</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <WideButton
          title="Sign In"
          color="white"
          onPress={() => navigation.navigate("SignIn")}
        />
      </View>
    </View>
  );
};

export default ResetPW_SuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.disabledBeige,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 12,
    paddingTop: 90,
  },
  mainContents: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    marginTop: 80,
    marginBottom: 40,
  },
  image: {
    width: 280,
    height: 290,
  },
  titleAndTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    rowGap: 20,
    width: 340,
    marginBottom: 100,
  },
  text: {
    fontSize: 15,
    fontFamily: "Mulish-Medium",
  },
  buttonContainer: {
    flex: 0.8,
    // marginTop: 80,
    marginBottom: 30,
  },
});

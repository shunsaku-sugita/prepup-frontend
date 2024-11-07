import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import WideButton from "@/components/common/WideButton";
import { useNavigation } from "expo-router";
import TitleText from "@/components/common/TitleText";
import { Colors } from "@/constants/Colors";

const ResetPW_SuccessScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.mainContents}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/ResetPasswordSuccessMessage.png")}
          />
        </View>
        <View style={styles.titleAndTextContainer}>
          <TitleText text="Well Done!" />
          <Text>Change has been successfully done.</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <WideButton
          title="Sign In"
          color="white"
          // need to check if user's info matches to our database
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
    paddingTop: 100,
  },
  mainContents: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    marginTop: 80,
    marginBottom: 60,
  },
  titleAndTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    rowGap: 20,
    width: 340,
    marginBottom: 80,
  },
  buttonContainer: {
    flex: 0.8,
    marginTop: 50,
  },
});

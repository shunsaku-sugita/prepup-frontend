import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import WideButton from "@/components/common/WideButton";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import TitleText from "@/components/common/TitleText";
import { Colors } from "@/constants/Colors";
import { verifyEmail } from "@/components/services/api";
import { AppContext } from "@/store/app-context";

const ResetPW_RequestScreen = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const { fontsLoaded } = useContext(AppContext);

  const navigation = useNavigation();

  // Single function to handle validation and API call
  const VerifyHandler = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(enteredEmail.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsProcessing(true); // Start processing

    try {
      const response = await verifyEmail(enteredEmail);
      if (response.status === 200) {
        navigation.navigate("ResetPW_Verifycode", {
          email: enteredEmail,
        });
      } else {
        setErrorMessage(
          response.response ? response.response.data.message : response.message
        );
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsProcessing(false); // Stop processing after API call
    }
  };

  if (!fontsLoaded) {
    return null; // return null if fonts aren't loaded
  }

  return (
    <View style={styles.container}>
      <View style={styles.mainContents}>
        <View style={styles.titleAndTextContainer}>
          <TitleText text="Reset Your Password" />
          <Text style={styles.description}>
            Enter the email associated with your account and we’ll send an email
            with instructions to reset your password.
          </Text>
        </View>
        <View style={styles.formContainer}>
          <View>
            <Text style={styles.fieldLabel}>
              Email <Text style={styles.astarisk}>*</Text>
            </Text>
          </View>
          <View
            style={errorMessage ? styles.emailFieldAlert : styles.emailField}
          >
            <TextInput
              placeholder="Enter your email address"
              placeholderTextColor={Colors.placeHolderTextGray}
              keyboardType="email-address"
              autoCapitalize="none"
              value={enteredEmail}
              onChangeText={(text) => setEnteredEmail(text)}
            />
          </View>
          {/* Inline error message */}
          {errorMessage && (
            <View style={styles.alertContainer}>
              <Ionicons
                name="alert-circle-outline"
                color={Colors.errorRed}
                size={20}
              />
              <Text style={styles.alertText}>{errorMessage}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <WideButton
          title={isProcessing ? "Sending..." : "Send Link"}
          color="white"
          onPress={VerifyHandler}
          display={isProcessing}
        />
      </View>
    </View>
  );
};

export default ResetPW_RequestScreen;

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
  },
  titleAndTextContainer: {
    marginBottom: 50,
    justifyContent: "flex-start",
    rowGap: 20,
    width: 340,
  },
  description: {
    fontSize: 15,
    fontFamily: "Mulish-Medium",
  },
  formContainer: {
    width: 340,
    rowGap: 4,
  },
  fieldLabel: {
    fontFamily: "MavenPro-Bold",
  },
  astarisk: {
    color: Colors.defaultRed,
  },
  emailField: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.disabledBeige,
    borderRadius: 4,
    backgroundColor: "white",
    width: "100%",
    paddingHorizontal: 8,
    paddingVertical: 12,
    fontFamily: "MavenPro-Medium",
  },
  emailFieldAlert: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.errorRed,
    borderRadius: 4,
    width: "100%",
    paddingHorizontal: 8,
    paddingVertical: 12,
    fontFamily: "MavenPro-Medium",
  },
  alertContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    columnGap: 2,
  },
  alertText: {
    color: Colors.errorRed,
    fontFamily: "Roboto-Medium",
  },
  buttonContainer: {
    flex: 0.8,
    marginTop: 30,
    marginBottom: 50,
  },
});

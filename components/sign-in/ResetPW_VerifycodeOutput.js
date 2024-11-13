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
import { useRoute } from "@react-navigation/native";
import { verifyOTP } from "@/components/services/api";
import Toast from "react-native-toast-message";
import { AppContext } from "@/store/app-context";

const ResetPW_VerifycodeOutput = () => {
  const [enteredCode, setEnteredCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const navigation = useNavigation();

  const route = useRoute();
  const { email } = route.params;

  const { fontsLoaded } = useContext(AppContext);

  const VerifyHandler = async () => {
    const codeRegex = /^\d{6}$/;
    if (!codeRegex.test(enteredCode.trim())) {
      setErrorMessage("length of the otp must be 6 characters");
      return;
    }

    setIsProcessing(true);
    try {
      const response = await verifyOTP(email, enteredCode);

      if (response.status == 200) {
        navigation.navigate("ResetPW_CreatePW", {
          email: email,
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

  const resendCodeHandler = () => {
    Toast.show({
      type: "error",
      text1: "Working on it !!!!",
      position: "top",
      autoHide: true,
      visibilityTime: 3000,
    });
  };

  if (!fontsLoaded) {
    return null; // return null if fonts aren't loaded
  }

  return (
    <View style={styles.container}>
      <View style={styles.mainContents}>
        <View style={styles.titleAndTextContainer}>
          <TitleText text="Change Password" />
          <Text style={styles.description}>
            Enter the verify code that we sent an email with instructions to
            reset your password.
          </Text>
        </View>
        <View style={styles.formContainer}>
          <View>
            <Text style={styles.fieldLabel}>
              Enter the code <Text style={styles.astarisk}>*</Text>
            </Text>
          </View>
          <View style={errorMessage ? styles.codeFieldAlert : styles.codeField}>
            <TextInput
              placeholder="_ _ _ _ _ _"
              placeholderTextColor={Colors.placeHolderTextGray}
              keyboardType="number-pad"
              returnKeyType="done"
              maxLength={6}
              value={enteredCode}
              onChangeText={(text) => setEnteredCode(text)}
            />
          </View>
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
          title={isProcessing ? "Verifying..." : "Verify"}
          color="white"
          onPress={VerifyHandler}
          display={isProcessing}
        />
        <View style={styles.codeTextContainer}>
          <Text style={styles.simpleButtonText}>Didn't receive code? </Text>
          <TouchableOpacity
            style={styles.simpleButton}
            onPress={resendCodeHandler}
          >
            <Text style={styles.resendCodeText}>Resend Code</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ResetPW_VerifycodeOutput;

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
    backgroundColor: Colors.disabledBeige,
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
  codeField: {
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
  codeFieldAlert: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.errorRed,
    borderRadius: 4,
    width: "100%",
    padding: 8,
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
    flex: 1,
    alignItems: "center",
    rowGap: 10,
    marginTop: 30,
    marginBottom: 50,
  },
  codeTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  simpleButton: {
    marginTop: 10,
  },
  simpleButtonText: {
    fontSize: 16,
    color: Colors.defaultBlue,
    fontFamily: "Mulish-Medium",
  },
  resendCodeText: {
    color: Colors.defaultBlue,
    fontFamily: "Mulish-ExtraBold",
    textDecorationLine: "underline",
    marginBottom: 10,
  },
});

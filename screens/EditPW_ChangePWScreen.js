import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import WideButton from "@/components/common/WideButton";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import TitleText from "@/components/common/TitleText";
import { Colors } from "@/constants/Colors";
import { createPassword, emptyToken } from "@/components/services/api";

const EditPW_ChangePWScreen = () => {
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState(false);

  const [passwordIsSecure, setPasswordIsSecure] = useState(false);
  const [confirmPasswordIsSecure, setConfirmPasswordIsSecure] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const navigation = useNavigation();

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);

  const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);

  // password validation function for 8+ characters, letters, numbers, and symbols
  const passwordValidation = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,}$/;
    return passwordRegex.test(password);
  };

  // real-time validation for password
  useEffect(() => {
    const isPasswordValid = passwordValidation(enteredPassword);
    setPasswordIsValid(isPasswordValid);
  }, [enteredPassword]);

  // real-time validation for confirm password
  useEffect(() => {
    const isConfirmPasswordValid = passwordValidation(confirmPassword);
    setConfirmPasswordIsValid(isConfirmPasswordValid);
  }, [confirmPassword]);

  const ConfirmHandler = async () => {
    const doPasswordsMatch = enteredPassword === confirmPassword;
    setPasswordsMatch(doPasswordsMatch);
    setIsSubmitted(true);

    // Reset the error message initially
    setErrorMessage("");

    if (!passwordIsValid || !confirmPasswordIsValid || !passwordsMatch) {
      setErrorMessage("Invalid password or password don't match.");
      return;
    }

    if (passwordIsValid && confirmPasswordIsValid && passwordsMatch) {
      setIsProcessing(true);

      try {
        const response = await createPassword(enteredPassword);

        if (response.status == 200) {
          await emptyToken();
          navigation.navigate("ResetPW_Success");
        } else {
          setErrorMessage(
            response.response
              ? response.response.data.message
              : response.message
          );
        }
      } catch (error) {
        setErrorMessage("An error occurred. Please try again.");
      } finally {
        setIsProcessing(false); // Stop processing after API call
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContents}>
        <View style={styles.titleAndTextContainer}>
          <TitleText text="Create New Password" />
          <Text>
            Your new password must be different from previous used passwords.
          </Text>
        </View>

        {/* password form */}
        <View style={styles.formContainer}>
          <View style={styles.titleQuestionContainer}>
            <Text style={styles.fieldLabel}>
              Password <Text style={styles.astarisk}>*</Text>
            </Text>
            <TouchableOpacity
              style={styles.questionIcon}
              onPress={() => setShowPasswordTooltip(!showPasswordTooltip)}
            >
              <Image source={require("../assets/images/question-icon.png")} />
            </TouchableOpacity>
          </View>
          {/* Tooltip */}
          {showPasswordTooltip && (
            <View style={styles.tooltipWrapper}>
              <View style={styles.triangle} />
              <View style={styles.tooltipContainer}>
                <Text style={styles.tooltipText}>
                  Minimum of 8 characters with a mix of letters, numbers, and
                  symbols.
                </Text>
              </View>
            </View>
          )}
          <View
            style={[
              !passwordIsValid && isSubmitted
                ? styles.passwordFieldAlert
                : styles.passwordField,
              isPasswordFocused && {
                borderWidth: 2,
                borderColor: Colors.defaultBlue,
              },
            ]}
          >
            <TextInput
              placeholder="Enter a password"
              placeholderTextColor={Colors.placeHolderTextGray}
              keyboardType="default"
              autoCapitalize="none"
              secureTextEntry={passwordIsSecure}
              value={enteredPassword}
              onChangeText={(text) => setEnteredPassword(text)}
              maxLength={30}
              style={{ width: "90%" }}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
            />
            <Ionicons
              name={passwordIsSecure ? "eye-off-outline" : "eye-outline"}
              color="black"
              size={20}
              onPress={() => setPasswordIsSecure(!passwordIsSecure)}
            />
          </View>
          {(!passwordIsValid || !confirmPasswordIsValid || !passwordsMatch) &&
            isSubmitted && (
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

        {/* confirm password form */}
        <View style={styles.formContainer}>
          <View>
            <Text style={styles.fieldLabel}>
              Confirm Password <Text style={styles.astarisk}>*</Text>
            </Text>
          </View>
          <View
            style={[
              !confirmPasswordIsValid && isSubmitted
                ? styles.passwordFieldAlert
                : styles.passwordField,
              isConfirmPasswordFocused && {
                borderWidth: 2,
                borderColor: Colors.defaultBlue,
              },
            ]}
          >
            <TextInput
              placeholder="Enter a password"
              placeholderTextColor={Colors.placeHolderTextGray}
              keyboardType="default"
              autoCapitalize="none"
              secureTextEntry={confirmPasswordIsSecure}
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              maxLength={30}
              style={{ width: "90%" }}
              onFocus={() => setIsConfirmPasswordFocused(true)}
              onBlur={() => setIsConfirmPasswordFocused(false)}
            />
            <Ionicons
              name={confirmPasswordIsSecure ? "eye-off-outline" : "eye-outline"}
              color="black"
              size={20}
              onPress={() =>
                setConfirmPasswordIsSecure(!confirmPasswordIsSecure)
              }
            />
          </View>
          {/* <View>
            <Text>Both passwords must match.</Text>
          </View> */}
          {(!passwordIsValid || !confirmPasswordIsValid || !passwordsMatch) &&
            isSubmitted && (
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
          title={isProcessing ? "Saveing..." : "Save"}
          color="white"
          onPress={ConfirmHandler}
          display={isProcessing}
        />
      </View>
    </View>
  );
};

export default EditPW_ChangePWScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultBeige,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
  },
  mainContents: {
    flex: 5,
    rowGap: 20,
  },
  titleAndTextContainer: {
    marginBottom: 40,
    justifyContent: "flex-start",
    rowGap: 20,
    width: 340,
  },
  formContainer: {
    width: 340,
    rowGap: 4,
  },
  fieldLabel: {
    fontWeight: "bold",
  },
  astarisk: {
    color: Colors.defaultRed,
  },
  titleQuestionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  questionIcon: {
    marginBottom: 2,
  },
  tooltipWrapper: {
    position: "absolute",
    top: 25,
    right: 5,
    alignItems: "center",
    zIndex: 10,
  },
  triangle: {
    width: 0,
    height: 0,
    left: 90,
    borderLeftWidth: 15,
    borderRightWidth: 5,
    borderBottomWidth: 12,
    borderStyle: "solid",
    backgroundColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: Colors.textLightDarkGray,
  },
  tooltipContainer: {
    backgroundColor: Colors.textLightDarkGray,
    padding: 8,
    borderRadius: 5,
    maxWidth: 220,
    marginTop: -5, // slight overlap to connect the triangle with the tooltip box
  },
  tooltipText: { color: "#fff", fontSize: 14 },
  fieldLabel: {
    fontWeight: "bold",
  },
  passwordField: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.defaultBeige,
    borderRadius: 4,
    backgroundColor: "white",
    width: "100%",
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  passwordFieldAlert: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.errorRed,
    borderRadius: 4,
    width: "100%",
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  alertContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    columnGap: 2,
  },
  alertText: {
    color: Colors.errorRed,
    fontWeight: 500,
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
    fontWeight: "bold",
    color: Colors.defaultBlue,
  },
});

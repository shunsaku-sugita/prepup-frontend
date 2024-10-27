import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import WideButton from "@/components/common/WideButton";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import TitleText from "@/components/common/TitleText";

const ResetPW_CreatePWScreen = () => {
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState(false);

  const [passwordIsSecure, setPasswordIsSecure] = useState(false);
  const [confirmPasswordIsSecure, setConfirmPasswordIsSecure] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const navigation = useNavigation();

  // password validation function for 8+ characters, letters, numbers, and symbols
  const passwordValidation = (password) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const ConfirmHandler = () => {
    const isPasswordValid = passwordValidation(enteredPassword);
    const isConfirmPasswordValid = passwordValidation(confirmPassword);
    const doPasswordsMatch = enteredPassword === confirmPassword;

    setPasswordIsValid(isPasswordValid);
    setConfirmPasswordIsValid(isConfirmPasswordValid);
    setPasswordsMatch(doPasswordsMatch);
    setIsSubmitted(true);

    if (passwordIsValid && confirmPasswordIsValid && passwordsMatch) {
      // ==>> need to use update password API?
      navigation.navigate("ResetPW_Success");
      setPasswordsMatch(false);
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

        <View style={styles.formContainer}>
          <View>
            <Text style={styles.fieldLabel}>Password *</Text>
          </View>
          <View
            style={
              !passwordIsValid && isSubmitted
                ? styles.passwordFieldAlert
                : styles.passwordField
            }
          >
            <TextInput
              placeholder="Enter a password"
              placeholderTextColor={"#aaa"}
              keyboardType="default"
              autoCapitalize="none"
              secureTextEntry={passwordIsSecure}
              value={enteredPassword}
              onChangeText={(text) => setEnteredPassword(text)}
            />
            <Ionicons
              name={passwordIsSecure ? "eye-off-outline" : "eye-outline"}
              color="black"
              size={20}
              onPress={() => setPasswordIsSecure(!passwordIsSecure)}
            />
          </View>
          <View>
            <Text>
              Minimum of 8 characters with a mix of letters, numbers, and
              symbols(@$!%*?&).
            </Text>
          </View>
          {!passwordIsValid && isSubmitted && (
            <View style={styles.alertContainer}>
              <Ionicons name="alert-circle-outline" color="red" size={20} />
              <Text style={styles.alertText}>
                This field cannot be left blank. Please try again.
              </Text>
            </View>
          )}
        </View>

        <View style={styles.formContainer}>
          <View>
            <Text style={styles.fieldLabel}>Confirm Password *</Text>
          </View>
          <View
            style={
              !confirmPasswordIsValid && isSubmitted
                ? styles.passwordFieldAlert
                : styles.passwordField
            }
          >
            <TextInput
              placeholder="Enter a password"
              placeholderTextColor={"#aaa"}
              keyboardType="default"
              autoCapitalize="none"
              secureTextEntry={confirmPasswordIsSecure}
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
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
          <View>
            <Text>Both passwords must match.</Text>
          </View>
          {!confirmPasswordIsValid && isSubmitted && (
            <View style={styles.alertContainer}>
              <Ionicons name="alert-circle-outline" color="red" size={20} />
              <Text style={styles.alertText}>
                This field cannot be left blank. Please try again.
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <WideButton
          title="Confirm"
          color="white"
          // need to check if user's info matches to our database
          onPress={ConfirmHandler}
        />
        <TouchableOpacity
          style={styles.simpleButton}
          onPress={() => {
            Alert.alert(
              "Cancel creating new password and go back to Sign in?",
              "The process is unsaved, you will lose it.",
              [
                {
                  text: "Cancel",
                },
                {
                  text: "Confirm",
                  onPress: () => {
                    navigation.navigate("SignIn-first");
                  },
                },
              ]
            );
          }}
        >
          <Text style={styles.simpleButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResetPW_CreatePWScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  passwordField: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 4,
    width: "100%",
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  passwordFieldAlert: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "red",
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
    color: "red",
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
    color: "blue",
  },
});

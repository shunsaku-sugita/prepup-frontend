import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
  } from "react-native";
  import React, { useEffect, useState } from "react";
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
    const [errorMessage, setErrorMessage] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);
  
    const navigation = useNavigation();
  
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
      useState(false);
  
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
  
    const ConfirmHandler = () => {
      const doPasswordsMatch = enteredPassword === confirmPassword;
      setPasswordsMatch(doPasswordsMatch);
      setIsSubmitted(true);
  
      // Reset the error message initially
      setErrorMessage("");
  
      if (!passwordIsValid || !confirmPasswordIsValid || !passwordsMatch) {
        setErrorMessage("Invalid password or two passwords don't match.");
        return;
      }
  
      if (passwordIsValid && confirmPasswordIsValid && passwordsMatch) {
        // ==>> need to use update password API?
  
        // Proceed if both passwords are valid and match
        navigation.goBack()
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
              style={[
                !passwordIsValid && isSubmitted
                  ? styles.passwordFieldAlert
                  : styles.passwordField,
                isPasswordFocused && {
                  borderWidth: 2,
                  borderColor: "blue",
                },
              ]}
            >
              <TextInput
                placeholder="Enter a password"
                placeholderTextColor={"#aaa"}
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
            <View>
              <Text>
                Minimum of 8 characters with a mix of letters, numbers, and
                symbols.
              </Text>
            </View>
            {(!passwordIsValid || !confirmPasswordIsValid || !passwordsMatch) &&
              isSubmitted && (
                <View style={styles.alertContainer}>
                  <Ionicons name="alert-circle-outline" color="red" size={20} />
                  <Text style={styles.alertText}>{errorMessage}</Text>
                </View>
              )}
          </View>
  
          <View style={styles.formContainer}>
            <View>
              <Text style={styles.fieldLabel}>Confirm Password *</Text>
            </View>
            <View
              style={[
                !confirmPasswordIsValid && isSubmitted
                  ? styles.passwordFieldAlert
                  : styles.passwordField,
                isConfirmPasswordFocused && {
                  borderWidth: 2,
                  borderColor: "blue",
                },
              ]}
            >
              <TextInput
                placeholder="Enter a password"
                placeholderTextColor={"#aaa"}
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
                  <Ionicons name="alert-circle-outline" color="red" size={20} />
                  <Text style={styles.alertText}>{errorMessage}</Text>
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
                "Discard password changes?",
                "Your current password will not be changed.",
                [
                  {
                    text: "Cancel",
                  },
                  {
                    text: "Continue",
                    onPress: () => {
                      navigation.goBack()
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
  
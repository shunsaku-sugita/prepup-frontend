import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import WideButton from "@/components/common/WideButton";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { signup } from "@/components/services/api";
import { Colors } from "@/constants/Colors";
import { AppContext } from "@/store/app-context";

const RegistrationOutput = () => {
  const [enteredFirstname, setEnteredFirstname] = useState("");
  const [enteredLastname, setEnteredLastname] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const [firstnameIsValid, setFirstnameIsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [usernameIsValid, setUsernameIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  const [passwordIsSecure, setPasswordIsSecure] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigation = useNavigation();

  const [isFirstnameFocused, setIsFirstnameFocused] = useState(false);
  const [isLastnameFocused, setIsLastnameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const [showUsernameTooltip, setShowUsernameTooltip] = useState(false);
  const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);

  const { fontsLoaded } = useContext(AppContext);

  // first name validation function(allows letters but requires at least one letter)
  const firstnameValidation = (firstname) => {
    const firstnameRegex = /^[a-zA-Z]+$/;
    return firstnameRegex.test(firstname.trim());
  };
  // general email validation function
  const emailValidation = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };
  // username validation function(allows letters and numbers but requires at least one letter)
  const usernameValidation = (username) => {
    const usernameRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/;
    return usernameRegex.test(username.trim());
  };
  // password validation function for 8+ letters, numbers, and symbols
  const passwordValidation = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,}$/;
    return passwordRegex.test(password);
  };

  // real-time validation for firstname
  useEffect(() => {
    const isFirstNameValid = firstnameValidation(enteredFirstname);
    setFirstnameIsValid(isFirstNameValid);
  }, [enteredFirstname]);
  // real-time validation for email
  useEffect(() => {
    const isEmailValid = emailValidation(enteredEmail);
    setEmailIsValid(isEmailValid);
  }, [enteredEmail]);
  // real-time validation for username
  useEffect(() => {
    const isUserNameValid = usernameValidation(enteredUsername);
    setUsernameIsValid(isUserNameValid);
  }, [enteredUsername]);
  // real-time validation for password
  useEffect(() => {
    const isPasswordValid = passwordValidation(enteredPassword);
    setPasswordIsValid(isPasswordValid);
  }, [enteredPassword]);

  const registerHandler = async () => {
    setIsSubmitted(true);

    if (
      firstnameIsValid &&
      emailIsValid &&
      usernameIsValid &&
      passwordIsValid
    ) {
      // ===>> use sign-up(register) API?
      const testSignupResult = await signup(
        enteredEmail,
        enteredPassword,
        enteredFirstname,
        enteredLastname,
        enteredUsername
      );
      console.log(
        "TEST => " + enteredEmail,
        enteredPassword,
        enteredFirstname,
        enteredLastname,
        enteredUsername
      );
      console.log(testSignupResult.data);

      navigation.navigate("RegistrationSuccess");
    }
  };

  if (!fontsLoaded) {
    return null; // return null if fonts aren't loaded
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flex: 1 }} scrollEnabled={false}>
          <View style={styles.container}>
            <View style={styles.mainContents}>
              <View style={styles.nameHorizontalContainer}>
                {/* firstname field */}
                <View style={styles.nameFormContainer}>
                  <View>
                    <Text style={styles.fieldLabel}>
                      First Name <Text style={styles.astarisk}>*</Text>
                    </Text>
                  </View>
                  <View
                    style={[
                      !firstnameIsValid && isSubmitted
                        ? styles.fieldAlert
                        : styles.nameField,
                      isFirstnameFocused && {
                        borderWidth: 2,
                        borderColor: Colors.defaultBlue,
                      },
                    ]}
                  >
                    <TextInput
                      placeholder="First Name"
                      placeholderTextColor={Colors.placeHolderTextGray}
                      keyboardType="default"
                      value={enteredFirstname}
                      onChangeText={(text) => setEnteredFirstname(text)}
                      onFocus={() => setIsFirstnameFocused(true)}
                      onBlur={() => setIsFirstnameFocused(false)}
                    />
                  </View>
                  {!firstnameIsValid && isSubmitted && (
                    <View style={styles.firstnameAlertContainer}>
                      <Ionicons
                        name="alert-circle-outline"
                        color={Colors.errorRed}
                        size={20}
                      />
                      <Text style={styles.alertText}>Invalid firstname.</Text>
                    </View>
                  )}
                </View>

                {/* lastname field */}
                <View style={styles.nameFormContainer}>
                  <View>
                    <Text style={styles.fieldLabel}>Last Name</Text>
                  </View>
                  <View
                    style={[
                      styles.nameField,
                      isLastnameFocused && {
                        borderWidth: 2,
                        borderColor: Colors.defaultBlue,
                      },
                    ]}
                  >
                    <TextInput
                      placeholder="Last Name (Optional)"
                      placeholderTextColor={Colors.placeHolderTextGray}
                      keyboardType="default"
                      value={enteredLastname}
                      onChangeText={(text) => setEnteredLastname(text)}
                      onFocus={() => setIsLastnameFocused(true)}
                      onBlur={() => setIsLastnameFocused(false)}
                    />
                  </View>
                </View>
              </View>

              {/* email field */}
              <View style={styles.formContainer}>
                <View>
                  <Text style={styles.fieldLabel}>
                    Email <Text style={styles.astarisk}>*</Text>
                  </Text>
                </View>
                <View
                  style={[
                    !emailIsValid && isSubmitted
                      ? styles.fieldAlert
                      : styles.emailField,
                    isEmailFocused && {
                      borderWidth: 2,
                      borderColor: Colors.defaultBlue,
                    },
                  ]}
                >
                  <TextInput
                    placeholder="Enter your email address"
                    placeholderTextColor={Colors.placeHolderTextGray}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={enteredEmail}
                    onChangeText={(text) => setEnteredEmail(text)}
                    onFocus={() => setIsEmailFocused(true)}
                    onBlur={() => setIsEmailFocused(false)}
                  />
                </View>
                {!emailIsValid && isSubmitted && (
                  <View style={styles.alertContainer}>
                    <Ionicons
                      name="alert-circle-outline"
                      color={Colors.errorRed}
                      size={20}
                    />
                    <Text style={styles.alertText}>Invalid email.</Text>
                  </View>
                )}
              </View>

              {/* username field */}
              <View style={styles.formContainer}>
                <View style={styles.titleQuestionContainer}>
                  <Text style={styles.fieldLabel}>
                    Username <Text style={styles.astarisk}>*</Text>
                  </Text>
                  <TouchableOpacity
                    style={styles.questionIcon}
                    onPress={() => setShowUsernameTooltip(!showUsernameTooltip)}
                  >
                    <Image
                      source={require("../../assets/images/question-icon.png")}
                    />
                  </TouchableOpacity>
                </View>
                {/* Tooltip */}
                {showUsernameTooltip && (
                  <View style={styles.tooltipWrapper}>
                    <View style={styles.triangle} />
                    <View style={styles.tooltipContainer}>
                      <Text style={styles.tooltipText}>
                        Choose a unique username for your account with letters
                        and/or numbers.
                      </Text>
                    </View>
                  </View>
                )}
                <View
                  style={[
                    !usernameIsValid && isSubmitted
                      ? styles.fieldAlert
                      : styles.emailField,
                    isUsernameFocused && {
                      borderWidth: 2,
                      borderColor: Colors.defaultBlue,
                    },
                  ]}
                >
                  <TextInput
                    placeholder="Enter a username"
                    placeholderTextColor={Colors.placeHolderTextGray}
                    keyboardType="default"
                    autoCapitalize="none"
                    value={enteredUsername}
                    onChangeText={(text) => setEnteredUsername(text)}
                    onFocus={() => setIsUsernameFocused(true)}
                    onBlur={() => setIsUsernameFocused(false)}
                  />
                </View>
                {!usernameIsValid && isSubmitted && (
                  <View style={styles.alertContainer}>
                    <Ionicons
                      name="alert-circle-outline"
                      color={Colors.errorRed}
                      size={20}
                    />
                    <Text style={styles.alertText}>Invalid username.</Text>
                  </View>
                )}
              </View>

              {/* password field */}
              <View style={styles.formContainer}>
                <View style={styles.titleQuestionContainer}>
                  <Text style={styles.fieldLabel}>
                    Password <Text style={styles.astarisk}>*</Text>
                  </Text>
                  <TouchableOpacity
                    style={styles.questionIcon}
                    onPress={() => setShowPasswordTooltip(!showPasswordTooltip)}
                  >
                    <Image
                      source={require("../../assets/images/question-icon.png")}
                    />
                  </TouchableOpacity>
                </View>
                {/* Tooltip */}
                {showPasswordTooltip && (
                  <View style={styles.tooltipWrapper}>
                    <View style={styles.triangle} />
                    <View style={styles.tooltipContainer}>
                      <Text style={styles.tooltipText}>
                        Minimum of 8 characters with a mix of letters, numbers,
                        and symbols.
                      </Text>
                    </View>
                  </View>
                )}
                <View
                  style={[
                    !passwordIsValid && isSubmitted
                      ? styles.fieldAlert
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
                {!passwordIsValid && isSubmitted && (
                  <View style={styles.alertContainer}>
                    <Ionicons
                      name="alert-circle-outline"
                      color={Colors.errorRed}
                      size={20}
                    />
                    <Text style={styles.alertText}>Invalid password.</Text>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.bottomButton}>
              <WideButton
                title="Register"
                color="white"
                // need to check if user's info matches to our database
                onPress={registerHandler}
              />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegistrationOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.disabledBeige,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 12,
    // paddingBottom: 70,
  },
  mainContents: {
    flex: 6,
    rowGap: 20,
    marginTop: 30,
  },
  nameHorizontalContainer: {
    flexDirection: "row",
    width: 340,
    columnGap: 6,
  },
  nameFormContainer: {
    width: "49%",
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
    padding: 10,
    borderRadius: 5,
    maxWidth: 220,
    marginTop: -5, // slight overlap to connect the triangle with the tooltip box
  },
  tooltipText: { color: "white", fontSize: 14, fontFamily: "Roboto-Regular" },
  fieldLabel: {
    fontFamily: "MavenPro-Bold",
  },
  nameField: {
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
  fieldAlert: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.errorRed,
    borderRadius: 4,
    backgroundColor: "white",
    width: "100%",
    paddingHorizontal: 8,
    paddingVertical: 12,
    fontFamily: "MavenPro-Medium",
  },
  passwordField: {
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
  firstnameAlertContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    columnGap: 2,
    width: "90%",
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
  bottomButton: {
    flex: 1,
  },
});

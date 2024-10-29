import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import WideButton from "@/components/common/WideButton";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { signup } from "@/components/services/api";

const RegistrationScreen = () => {
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
  // password validation function for 8+ characters, letters, numbers, and symbols
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
        enteredLastname
      );
      console.log(testSignupResult);

      navigation.navigate("RegistrationSuccess");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContents}>
        <View style={styles.nameHorizontalContainer}>
          {/* firstname field */}
          <View style={styles.nameFormContainer}>
            <View>
              <Text style={styles.fieldLabel}>First Name *</Text>
            </View>
            <View
              style={[
                !firstnameIsValid && isSubmitted
                  ? styles.fieldAlert
                  : styles.nameField,
                isFirstnameFocused && {
                  borderWidth: 2,
                  borderColor: "blue",
                },
              ]}
            >
              <TextInput
                placeholder="First Name"
                placeholderTextColor={"#aaa"}
                keyboardType="default"
                value={enteredFirstname}
                onChangeText={(text) => setEnteredFirstname(text)}
                onFocus={() => setIsFirstnameFocused(true)}
                onBlur={() => setIsFirstnameFocused(false)}
              />
            </View>
            {!firstnameIsValid && isSubmitted && (
              <View style={styles.firstnameAlertContainer}>
                <Ionicons name="alert-circle-outline" color="red" size={20} />
                <Text style={styles.alertText}>
                  Please type one word with letters.
                </Text>
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
                  borderColor: "blue",
                },
              ]}
            >
              <TextInput
                placeholder="Last Name (Optional)"
                placeholderTextColor={"#aaa"}
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
            <Text style={styles.fieldLabel}>Email *</Text>
          </View>
          <View
            style={[
              !emailIsValid && isSubmitted
                ? styles.fieldAlert
                : styles.emailField,
              isEmailFocused && {
                borderWidth: 2,
                borderColor: "blue",
              },
            ]}
          >
            <TextInput
              placeholder="Enter your email address"
              placeholderTextColor={"#aaa"}
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
              <Ionicons name="alert-circle-outline" color="red" size={20} />
              <Text style={styles.alertText}>
                Invalid email. Please try again.
              </Text>
            </View>
          )}
        </View>

        {/* username field */}
        <View style={styles.formContainer}>
          <View>
            <Text style={styles.fieldLabel}>Username *</Text>
          </View>
          <View
            style={[
              !usernameIsValid && isSubmitted
                ? styles.fieldAlert
                : styles.emailField,
              isUsernameFocused && {
                borderWidth: 2,
                borderColor: "blue",
              },
            ]}
          >
            <TextInput
              placeholder="Enter a username"
              placeholderTextColor={"#aaa"}
              keyboardType="default"
              autoCapitalize="none"
              value={enteredUsername}
              onChangeText={(text) => setEnteredUsername(text)}
              onFocus={() => setIsUsernameFocused(true)}
              onBlur={() => setIsUsernameFocused(false)}
            />
          </View>
          <View>
            <Text>Choose a unique username with letters or numbers.</Text>
          </View>
          {!usernameIsValid && isSubmitted && (
            <View style={styles.alertContainer}>
              <Ionicons name="alert-circle-outline" color="red" size={20} />
              <Text style={styles.alertText}>
                This field cannot be left blank.
              </Text>
            </View>
          )}
        </View>

        {/* password field */}
        <View style={styles.formContainer}>
          <View>
            <Text style={styles.fieldLabel}>Password *</Text>
          </View>
          <View
            style={[
              !passwordIsValid && isSubmitted
                ? styles.fieldAlert
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
          {!passwordIsValid && isSubmitted && (
            <View style={styles.alertContainer}>
              <Ionicons name="alert-circle-outline" color="red" size={20} />
              <Text style={styles.alertText}>
                Invalid password. Please try again.
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.bottomButton}>
        <WideButton
          title="Regiser"
          color="white"
          // need to check if user's info matches to our database
          onPress={registerHandler}
        />
      </View>
    </View>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  nameField: {
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
  emailField: {
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
  fieldAlert: {
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
    color: "red",
    fontWeight: 500,
  },
  bottomButton: {
    flex: 1,
  },
});

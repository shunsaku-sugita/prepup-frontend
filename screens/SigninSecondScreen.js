import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import WideButton from "@/components/common/WideButton";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const SigninSecondScreen = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  const [passwordIsSecure, setPasswordIsSecure] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigation = useNavigation();

  // general email validation function
  const emailValidation = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };
  // password validation function for 8+ characters, letters, numbers, and symbols
  const passwordValidation = (password) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const signInHandler = () => {
    const isEmailValid = emailValidation(enteredEmail);
    const isPasswordValid = passwordValidation(enteredPassword);

    setEmailIsValid(isEmailValid);
    setPasswordIsValid(isPasswordValid);
    setIsSubmitted(true);

    if (emailIsValid && passwordIsValid) {
      // use sign-in API later
      navigation.navigate("Category");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/images/img.png")} />
      </View>

      <View style={styles.formContainer}>
        <View>
          <Text style={styles.fieldLabel}>Email *</Text>
        </View>
        <View
          style={
            !emailIsValid && isSubmitted
              ? styles.emailFieldAlert
              : styles.emailField
          }
        >
          <TextInput
            placeholder="example@email.com"
            placeholderTextColor={"#aaa"}
            keyboardType="email-address"
            autoCapitalize="none"
            value={enteredEmail}
            onChangeText={(text) => setEnteredEmail(text)}
          />
        </View>
        {!emailIsValid && isSubmitted && (
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

      <WideButton
        title="Sign In"
        color="white"
        // need to check if user's info matches to our database
        onPress={signInHandler}
      />
      <TouchableOpacity
        style={styles.simpleButton}
        onPress={() => navigation.navigate("ResetPW_request")}
      >
        <Text style={styles.simpleButtonText}>Forget Password ?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.simpleButton}
        // onPress={}
      >
        <Text style={styles.simpleButtonText}>Login with Google Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SigninSecondScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    rowGap: 12,
    paddingBottom: 100,
  },
  imageContainer: {
    marginBottom: 40,
  },
  formContainer: {
    width: 340,
    rowGap: 4,
  },
  fieldLabel: {
    fontWeight: "bold",
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
  emailFieldAlert: {
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
  simpleButton: {
    marginTop: 10,
  },
  simpleButtonText: {
    fontSize: 16,
    color: "blue",
  },
});

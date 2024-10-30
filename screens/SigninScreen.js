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
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from "@react-native-google-signin/google-signin";
// import { signinWithGoogle } from "../components/services/signinWithGoogle";
// import { WEB_CLIENT_ID, IOS_CLIENT_ID } from "../config/googleConfig";

// GoogleSignin.configure({
//   webClientId: WEB_CLIENT_ID,
//   scopes: ["https://www.googleapis.com/auth/drive.readonly"],
//   offlineAccess: true,
//   forceCodeForRefreshToken: true,
//   iosClientId: IOS_CLIENT_ID,
// });

const SigninScreen = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  const [passwordIsSecure, setPasswordIsSecure] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigation = useNavigation();

  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  // general email validation function(requires **@**.** format)
  const emailValidation = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };
  // password validation function for 8+ characters, letters, numbers, and symbols
  const passwordValidation = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,}$/;
    return passwordRegex.test(password);
  };

  // real-time validation for email
  useEffect(() => {
    const isEmailValid = emailValidation(enteredEmail);
    setEmailIsValid(isEmailValid);
  }, [enteredEmail]);

  // real-time validation for password
  useEffect(() => {
    const isPasswordValid = passwordValidation(enteredPassword);
    setPasswordIsValid(isPasswordValid);
  }, [enteredPassword]);

  const signInHandler = () => {
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

      {/* email field */}
      <View style={styles.formContainer}>
        <View style={styles.titleQuestionContainer}>
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
            placeholder="Enter your email adddress"
            placeholderTextColor={"#6f6f6f"}
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
            <Text style={styles.alertText}>Incorrect email.</Text>
          </View>
        )}
      </View>

      {/* password field */}
      <View style={styles.formContainer}>
        <View style={styles.titleQuestionContainer}>
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
            placeholderTextColor={"#6f6f6f"}
            keyboardType="default"
            autoCapitalize="none"
            secureTextEntry={passwordIsSecure}
            value={enteredPassword}
            onChangeText={(text) => setEnteredPassword(text)}
            maxLength={30}
            style={{
              width: "90%",
            }}
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
            <Ionicons name="alert-circle-outline" color="red" size={20} />
            <Text style={styles.alertText}>Incorrect password.</Text>
          </View>
        )}
      </View>

      {/* buttons and link */}
      <View style={styles.buttonsContainer}>
        <WideButton
          title="Sign In"
          color="white"
          // need to check if user's info matches to our database
          onPress={signInHandler}
        />
        <TouchableOpacity
          style={styles.googleButton}
          // onPress={signinWithGoogle}
        >
          <Image source={require("../assets/images/google-signin-icon.png")} />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.simpleButton}
          onPress={() => navigation.navigate("ResetPW_request")}
        >
          <Text style={styles.simpleButtonText}>Forget Password</Text>
        </TouchableOpacity>
        <View style={styles.signupTextContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity
            style={styles.signupLinkButton}
            onPress={() => navigation.navigate("Registration")}
          >
            <Text style={styles.signupLinkText}>Sign up</Text>
          </TouchableOpacity>
          <Text>here</Text>
        </View>
      </View>

      {/* tentative buttons for development purpose */}
      <View style={styles.devButtonsContainer}>
        <TouchableOpacity
          style={styles.homeNavigationButton}
          onPress={() => navigation.navigate("Category")}
        >
          <Text style={styles.homeNavigationText}>Home(Category)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.onboardingNavigationButton}
          onPress={() => navigation.navigate("OnboardingOne")}
        >
          <Text style={styles.onboardingNavigationText}>Onboarding</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    rowGap: 12,
    // paddingBottom: 10,
  },
  imageContainer: {
    marginBottom: 40,
  },
  formContainer: {
    width: 340,
    rowGap: 4,
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
    borderBottomColor: "#333",
  },
  tooltipContainer: {
    backgroundColor: "#333",
    padding: 8,
    borderRadius: 5,
    maxWidth: 220,
    marginTop: -5, // slight overlap to connect the triangle with the tooltip box
  },
  tooltipText: { color: "#fff", fontSize: 14 },
  passwordField: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
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
  buttonsContainer: {
    marginTop: 20,
    alignItems: "center",
    rowGap: 10,
  },
  googleButton: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    columnGap: 8,
    backgroundColor: "#ddd",
    borderRadius: 6,
    padding: 10,
    width: 340,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  simpleButton: {
    marginVertical: 15,
  },
  simpleButtonText: {
    fontSize: 16,
    color: "blue",
  },
  signupTextContainer: {
    flexDirection: "row",
    columnGap: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    color: "#454545",
  },
  signupLinkButton: {
    // backgroundColor: "#ddd",
  },
  signupLinkText: {
    color: "black",
    fontWeight: "600",
  },
  devButtonsContainer: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 6,
    columnGap: 20,
    flexDirection: "row",
  },
  // homeNavigationButton: {},
  homeNavigationText: {
    textDecorationLine: "underline",
  },
  // onboardingNavigationButton: {},
  onboardingNavigationText: {
    textDecorationLine: "underline",
  },
});

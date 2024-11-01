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
import { login } from "@/components/services/api";
import { Colors } from "@/constants/Colors";
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
  const [enteredEmail, setEnteredEmail] = useState("test107@gmail.com");
  const [enteredPassword, setEnteredPassword] = useState("12345@abcde");

  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  const [passwordIsSecure, setPasswordIsSecure] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigation = useNavigation();

  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const [emailError, setEmailError] = useState("Incorrect email.");

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

  const signInHandler = async () => {
    setIsSubmitted(true);

    if (emailIsValid && passwordIsValid) {
      // use log-in API

      const response = await login(enteredEmail, enteredPassword);
      console.log("Response: " + response);
      if (response?.status == 200) {
        navigation.navigate("Category");
      } else {
        console.log("error");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/images/signin-background.png")} style={styles.backgroundImage} />
        <Image source={require("../assets/images/logo-color.png")} style={styles.logoImage} />
      </View>

      {/* email field */}
      <View style={styles.formContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.fieldLabel}>Email{" "}<Text style={styles.astarisk}>*</Text></Text>
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
            placeholder="Enter your email adddress"
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
            <Ionicons name="alert-circle-outline" color={Colors.errorRed} size={20} />
            <Text style={styles.alertText}>{emailError}</Text>
          </View>
        )}
      </View>

      {/* password field */}
      <View style={styles.formContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.fieldLabel}>Password{" "}<Text style={styles.astarisk}>*</Text></Text>
        </View>
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
            <Ionicons name="alert-circle-outline" color={Colors.errorRed} size={20} />
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
          style={styles.forgetPasswordButton}
          onPress={() => navigation.navigate("ResetPW_request")}
        >
          <Text style={styles.forgetPasswordButtonText}>Forget Password</Text>
        </TouchableOpacity>
        <View style={styles.signupTextContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity
            style={styles.signupLinkButton}
            onPress={() => navigation.navigate("Registration")}
          >
            <Text style={styles.signupLinkText}>Sign up</Text>
          </TouchableOpacity>
          <Text style={styles.signupText}>here</Text>
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
    backgroundColor: Colors.defaultBeige,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 12,
    // paddingBottom: 10,
  },
  imageContainer: {
    marginTop: 70,
    marginBottom: 10,
    width: 140,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  backgroundImage: {
    position: "absolute",
  },
  logoImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 120,
  },
  formContainer: {
    width: 340,
    rowGap: 4,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fieldLabel: {
    fontWeight: 'bold',
  },
  astarisk: {
    color: Colors.defaultRed,
  },
  emailField: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.defaultBeige,
    borderRadius: 4,
    backgroundColor: 'white',
    width: "100%",
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  fieldAlert: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.errorRed,
    borderRadius: 4,
    backgroundColor: 'white',
    width: "100%",
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  passwordField: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.defaultBeige,
    borderRadius: 4,
    backgroundColor: 'white',
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
  buttonsContainer: {
    marginTop: 20,
    alignItems: "center",
    rowGap: 10,
  },
  googleButton: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    columnGap: 10,
    backgroundColor: "#F2F2F3",
    borderWidth: 2,
    borderColor: "#F2F2F3",
    borderRadius: 6,
    padding: 10,
    width: 340,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  forgetPasswordButton: {
    marginVertical: 15,
  },
  forgetPasswordButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.defaultBlue,
  },
  signupTextContainer: {
    flexDirection: "row",
    columnGap: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    color: Colors.placeHolderTextGray,
  },
  signupLinkButton: {
    // backgroundColor: "#ddd",
  },
  signupLinkText: {
    color: Colors.lightBlack,
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

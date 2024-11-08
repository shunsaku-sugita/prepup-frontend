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
import { IOS_CLIENT_ID, ANDROID_CLIENT_ID } from "../config/googleConfig";
import { login, signinWithGoogle } from "@/components/services/api";
import { Colors } from "@/constants/Colors";
// Firebase Authentication
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebaseConfig";

WebBrowser.maybeCompleteAuthSession();

const SigninScreen = () => {
  const [enteredEmail, setEnteredEmail] = useState("khushalkhnta4@gmail.com");
  const [enteredPassword, setEnteredPassword] = useState("Hello@123");

  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  const [passwordIsSecure, setPasswordIsSecure] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigation = useNavigation();

  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const [emailError, setEmailError] = useState("Incorrect email.");
  const [passwordError, setPasswordError] = useState("Incorrect Password");

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
    setEmailError("Invalid email format.");
    setEmailIsValid(isEmailValid);
  }, [enteredEmail]);

  // real-time validation for password
  useEffect(() => {
    const isPasswordValid = passwordValidation(enteredPassword);
    setPasswordError("Invalid passsword fromat.");
    setPasswordIsValid(isPasswordValid);
  }, [enteredPassword]);

  // sign-in handler function
  const signInHandler = async () => {
    setIsSubmitted(true);

    if (emailIsValid && passwordIsValid) {
      // use log-in API

      const response = await login(enteredEmail, enteredPassword);
      console.log("Response: " + response);
      if (response?.status == 200) {
        navigation.navigate("Category");
      } else if (response?.status == 400) {
        setEmailError(
          response.response ? response.response.data.message : response.message
        );
        setEmailIsValid(false);
      } else {
        setPasswordError(response?.data?.message);
        setPasswordIsValid(false);
      }
    }
  };

  // Google Sign-in setup
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: IOS_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
  });

  // Check for existing user info in local storage on page load
  useEffect(() => {
    loadUserFromStorage();
  }, []);

  // Load user data from local storage if available
  const loadUserFromStorage = async () => {
    try {
      const userJSON = await AsyncStorage.getItem("userInfo");
      if (userJSON) {
        setUserInfo(JSON.parse(userJSON));
      }
    } catch (error) {
      console.error("Error loading user info from storage: ", error.message);
    }
  };

  // Initiates Google Sign-In flow when the button is clicked
  const GoogleSigninHandler = async () => {
    try {
      if (userInfo) {
        // User info exists, skip sign-in and proceed with Google sign-in process
        await handleSigninWithGoogle(userInfo);
      } else {
        // No user info, initiate Google sign-in flow
        await promptAsync();
      }
    } catch (error) {
      console.error("Error initiating Google Sign-In: ", error.message);
    }
  };

  // Handles Firebase sign-in using Google ID token
  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      handleFirebaseSignIn(id_token);
    }
  }, [response]);

  // Signs in with Firebase and saves user data locally
  const handleFirebaseSignIn = async (idToken) => {
    try {
      const credential = GoogleAuthProvider.credential(idToken);
      const userCredential = await signInWithCredential(auth, credential);
      const user = userCredential.user;

      await handleSigninWithGoogle(user);
      await AsyncStorage.setItem("userInfo", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.error("Error with Firebase sign-in: ", error.message);
    }
  };

  // Executes signinWithGoogle and navigates based on response
  const handleSigninWithGoogle = async (user) => {
    const { email, firstName, lastName } = formatGoogleAccountData(user);
    const responseGoogle = await signinWithGoogle(email, firstName, lastName);

    if (responseGoogle?.status === 200) {
      navigation.navigate("Category");
    } else if (responseGoogle?.status === 201) {
      navigation.navigate("OnboardingOne");
    } else {
      console.error("Error during Google sign-in");
    }
  };

  // Formats Google user data for use in the app
  const formatGoogleAccountData = (userData) => {
    const { email, displayName } = userData;
    const firstName = displayName.split(" ")[0];
    const lastName = displayName.split(" ")[1] || "";
    return { email, firstName, lastName };
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/signin-background.png")}
          style={styles.backgroundImage}
        />
        <Image
          source={require("../assets/images/PrepUp-Logo-COLORED.png")}
          style={styles.logoImage}
        />
      </View>

      {/* email field */}
      <View style={styles.formContainer}>
        <View style={styles.titleContainer}>
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
            <Ionicons
              name="alert-circle-outline"
              color={Colors.errorRed}
              size={20}
            />
            <Text style={styles.alertText}>{emailError}</Text>
          </View>
        )}
      </View>

      {/* password field */}
      <View style={styles.formContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.fieldLabel}>
            Password <Text style={styles.astarisk}>*</Text>
          </Text>
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
            <Ionicons
              name="alert-circle-outline"
              color={Colors.errorRed}
              size={20}
            />
            <Text style={styles.alertText}>{passwordError}</Text>
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
          onPress={GoogleSigninHandler}
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

      {/* tentative button for development purpose */}
      <View style={styles.devButtonsContainer}>
        <TouchableOpacity
          style={styles.homeNavigationButton}
          onPress={() => navigation.navigate("Category")}
        >
          <Text style={styles.homeNavigationText}>Home(Category)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.disabledBeige,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 12,
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
    width: 110,
    height: 110,
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
    fontWeight: "bold",
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
    fontWeight: "bold",
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
  signupLinkButton: {},
  signupLinkText: {
    color: Colors.lightBlack,
    fontWeight: "600",
  },
  // tentative (delete)
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

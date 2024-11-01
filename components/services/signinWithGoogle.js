// googleAuthUtils.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { signinWithGoogle } from "./api";

export const checkLocalUser = async (promptAsync, formatGoogleAccountData) => {
  try {
    const userJSON = await AsyncStorage.getItem("userInfo");
    const userData = userJSON ? JSON.parse(userJSON) : null;
    if (userData) {
      const { email, firstName, lastName } = formatGoogleAccountData(userData);
      signinWithGoogle(email, firstName, lastName);
    } else {
      const { email, firstName, lastName } = await promptAsync();

    }
  } catch (error) {
    console.error(error.message);
  }
};

export const formatGoogleAccountData = (userData) => {
  const { email, displayName } = userData;
  const firstName = displayName.split(" ").length > 1 ? displayName.split(" ")[0] : displayName;
  const lastName = displayName.split(" ").length > 1 ? displayName.split(" ")[1] : "";
  return { email, firstName, lastName };
};

export const logoutHandler = async (navigation) => {
  try {
    await signOut(auth);
    await AsyncStorage.removeItem("userInfo");
    navigation.navigate("SigninScreen");
    console.log("User successfully logged out");
  } catch (error) {
    console.error("Error logging out: ", error.message);
    alert("Failed to log out. Please try again.");
  }
};

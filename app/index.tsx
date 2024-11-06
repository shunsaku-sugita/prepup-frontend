import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import InterviewSimulatorScreen from "../screens/InterviewSimulatorScreen";
import InterviewFeedbackScreen from "../screens/InterviewFeedbackScreen";
import JobSearchScreen from "../screens/JobSearchScreen";
import IconButton from "../components/common/IconButton";

import SplashScreen from "../screens/SplashScreen";
// import NotificationsScreen from "../screens/NotificationsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import EditPW_ChangePWScreen from "../screens/EditPW_ChangePWScreen";

import AppContextProvider, { AppContext } from "../store/app-context";
import CategoryScreen from "../screens/CategoryScreen";
import QuizStarterScreen from "../screens/QuizStarterScreen";
import QuizFeedbackScreen from "../screens/QuizFeedbackScreen";
import QuizScreen from "../screens/QuizScreen";
import PreloaderScreen from "../screens/PreloaderScreen";
import SigninScreen from "../screens/SigninScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import RegistrationSuccessScreen from "../screens/RegistrationSuccessScreen";
import OnboardingOneScreen from "../screens/OnboardingOneScreen";
import OnboardingTwoScreen from "../screens/OnboardingTwoScreen";
import OnboardingThreeScreen from "../screens/OnboardingThreeScreen";
import ResetPW_RequestScreen from "../screens/ResetPW_RequestScreen";
import ResetPW_VerifycodeScreen from "../screens/ResetPW_VerifycodeScreen";
import ResetPW_CreatePWScreen from "../screens/ResetPW_CreatePWScreen";
import ResetPW_SuccessScreen from "../screens/ResetPW_SuccessScreen";

import StarQuizScreen from "../screens/StarQuizScreen";
import StarQuizFeedbackScreen from "../screens/StarQuizFeedbackScreen";
import { useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Toast from "react-native-toast-message";
import { Colors } from "@/constants/Colors";
import { toastConfig } from "../components/toast/ToastComponent";

const Stack = createNativeStackNavigator();

export default function App() {
  const navigation = useNavigation();
  return (
    <>
      <StatusBar style="auto" />
      <GestureHandlerRootView>
        <AppContextProvider>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: "#FFEAD9",
              },
            }}
          >
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Category"
              component={CategoryScreen}
              options={{
                headerShown: false,
              }}
            />
            {/* <Stack.Screen
              name="EditProfile"
              component={EditProfileScreen}
              options={{ title: "Edit Profile", headerShown: true }}
            /> */}
            <Stack.Screen
              name="JobSearch"
              component={JobSearchScreen}
              options={{
                headerShown: true,
                headerStyle: { backgroundColor: Colors.disabledBeige },
                headerShadowVisible: false,
                headerTitle: () => (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={require("../assets/images/PrepUp-Black-Small.png")}
                      style={{ width: 34, height: 34 }}
                    />
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      Job Finder
                    </Text>
                  </View>
                ),
                headerLeft: () => (
                  <IconButton
                    icon="arrow-back"
                    color="black"
                    size={28}
                    display={false}
                    onPress={() => navigation.goBack()}
                  />
                ),
              }}
            />
            {/* <Stack.Screen
              name="Flashcard"
              component={QuizStarterScreen}
              options={{
                headerShown: true,
                title: "",
                headerLeft: () => (
                  <IconButton
                    icon="arrow-back"
                    color="black"
                    size={28}
                    display={false}
                    onPress={() => navigation.goBack()}
                  />
                ),
              }}
            /> */}
            <Stack.Screen
              name="InterviewSimulator"
              component={InterviewSimulatorScreen}
              options={({ navigation }) => ({
                headerShown: true,
                headerStyle: { backgroundColor: Colors.disabledBeige },
                headerShadowVisible: false,
                headerTitle: () => (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={require("../assets/images/PrepUp-Black-Small.png")}
                      style={{ width: 34, height: 34 }}
                    />
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      Simulator
                    </Text>
                  </View>
                ),
                headerRight: null,
                headerLeft: () =>
                  // Check if the user can go back before showing the back button
                  navigation.canGoBack() ? (
                    <IconButton
                      icon="arrow-back"
                      color="black"
                      size={28}
                      display={false}
                      onPress={() => {
                        Alert.alert(
                          "Cancel the simulator?",
                          "The process is unsaved, you will lose it.",
                          [
                            {
                              text: "Cancel",
                            },
                            {
                              text: "Confirm",
                              onPress: () => {
                                navigation.goBack();
                              },
                            },
                          ]
                        );
                      }}
                    />
                  ) : null,
              })}
            />
            <Stack.Screen
              name="InterviewFeedback"
              component={InterviewFeedbackScreen}
              options={({ navigation }) => ({
                headerShown: true,
                headerStyle: { backgroundColor: Colors.disabledBeige },
                headerShadowVisible: false,
                headerTitle: () => (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={require("../assets/images/PrepUp-Black-Small.png")}
                      style={{ width: 34, height: 34 }}
                    />
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      Feedback
                    </Text>
                  </View>
                ),
                headerRight: null,
                headerLeft: () =>
                  // Check if the user can go back before showing the back button
                  navigation.canGoBack() ? (
                    <IconButton
                      icon="arrow-back"
                      color="black"
                      size={28}
                      display={false}
                      onPress={() => navigation.navigate("Category")}
                    />
                  ) : null,
              })}
            />
            <Stack.Screen
              name="StarQuiz"
              component={StarQuizScreen}
              options={({ navigation }) => ({
                headerShown: true,
                title: "S.T.A.R Master",
                headerStyle: { backgroundColor: Colors.disabledBeige },
                headerShadowVisible: false,
                headerTitle: () => (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={require("../assets/images/PrepUp-Black-Small.png")}
                      style={{ width: 34, height: 34 }}
                    />
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      S.T.A.R Master
                    </Text>
                  </View>
                ),
                headerRight: null,
                headerLeft: () =>
                  // Check if the user can go back before showing the back button
                  navigation.canGoBack() ? (
                    <IconButton
                      icon="arrow-back"
                      color="black"
                      size={28}
                      display={false}
                      onPress={() => {
                        Alert.alert(
                          "Cancel the STAR Master?",
                          "The process is unsaved, you will lose it.",
                          [
                            {
                              text: "Cancel",
                            },
                            {
                              text: "Confirm",
                              onPress: () => {
                                navigation.navigate("Category");
                              },
                            },
                          ]
                        );
                      }}
                    />
                  ) : null,
              })}
            />
            <Stack.Screen
              name="StarQuizFeedback"
              component={StarQuizFeedbackScreen}
              options={({ navigation }) => ({
                headerShown: true,
                headerStyle: { backgroundColor: Colors.disabledBeige },
                headerShadowVisible: false,
                headerTitle: () => (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={require("../assets/images/PrepUp-Black-Small.png")}
                      style={{ width: 34, height: 34 }}
                    />
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      S.T.A.R Master
                    </Text>
                  </View>
                ),
                headerRight: null,
                headerLeft: () => (
                  <IconButton
                    icon="arrow-back"
                    color="black"
                    size={28}
                    display={false}
                    onPress={() => {
                      Alert.alert(
                        "Go back to the Category?",
                        "Please confirm if you want to proceed.",
                        [
                          {
                            text: "Cancel",
                          },
                          {
                            text: "Confirm",
                            onPress: () => {
                              navigation.navigate("Category");
                            },
                          },
                        ]
                      );
                    }}
                  />
                ),
              })}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={({ navigation }) => ({
                headerShown: true,
                headerStyle: { backgroundColor: Colors.disabledBeige },
                headerShadowVisible: false,
                headerTitle: () => (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={require("../assets/images/PrepUp-Black-Small.png")}
                      style={{ width: 34, height: 34 }}
                    />
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      Account
                    </Text>
                  </View>
                ),
                headerLeft: () =>
                  // Check if the user can go back before showing the back button
                  navigation.canGoBack() ? (
                    <IconButton
                      icon="arrow-back"
                      color="black"
                      size={28}
                      display={false}
                      onPress={() => navigation.goBack()}
                    />
                  ) : null,
              })}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfileScreen}
              options={{
                headerShown: true,
                headerStyle: { backgroundColor: Colors.disabledBeige },
                headerShadowVisible: false,
                headerTitle: () => (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={require("../assets/images/PrepUp-Black-Small.png")}
                      style={{ width: 34, height: 34 }}
                    />
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      Edit Information
                    </Text>
                  </View>
                ),
                headerLeft: () => (
                  <IconButton
                    icon="arrow-back"
                    color="black"
                    size={28}
                    display={false}
                    onPress={() => navigation.goBack()}
                  />
                ),
              }}
            />
            <Stack.Screen
              name="EditPW_ChangePW"
              component={EditPW_ChangePWScreen}
              options={{
                headerShown: true,
                headerStyle: { backgroundColor: Colors.disabledBeige },
                headerShadowVisible: false,
                headerTitle: () => (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={require("../assets/images/PrepUp-Black-Small.png")}
                      style={{ width: 34, height: 34 }}
                    />
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      Change Password
                    </Text>
                  </View>
                ),
                headerLeft: () => (
                  <IconButton
                    icon="arrow-back"
                    color="black"
                    size={28}
                    display={false}
                    onPress={() => navigation.goBack()}
                  />
                ),
              }}
            />
            <Stack.Screen
              name="Preloader"
              component={PreloaderScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="SignIn"
              component={SigninScreen}
              options={{
                headerShown: true,
                headerStyle: { backgroundColor: Colors.disabledBeige },
                headerShadowVisible: false,
                headerTitle: () => (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={require("../assets/images/PrepUp-Black-Small.png")}
                      style={{ width: 34, height: 34 }}
                    />
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      Sign In
                    </Text>
                  </View>
                ),
                headerBackVisible: false,
              }}
            />
            <Stack.Screen
              name="Registration"
              component={RegistrationScreen}
              options={({ navigation }) => ({
                headerShown: true,
                headerStyle: { backgroundColor: Colors.disabledBeige },
                headerShadowVisible: false,
                headerTitle: () => (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={require("../assets/images/PrepUp-Black-Small.png")}
                      style={{ width: 34, height: 34 }}
                    />
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      Sign Up
                    </Text>
                  </View>
                ),
                headerLeft: () =>
                  // Check if the user can go back before showing the back button
                  navigation.canGoBack() ? (
                    <IconButton
                      icon="arrow-back"
                      color="black"
                      size={28}
                      display={false}
                      onPress={() => navigation.goBack()}
                    />
                  ) : null,
              })}
            />
            <Stack.Screen
              name="RegistrationSuccess"
              component={RegistrationSuccessScreen}
              options={({ navigation }) => ({
                headerShown: false,
                headerLeft: () =>
                  // Check if the user can go back before showing the back button
                  navigation.canGoBack() ? (
                    <IconButton
                      icon="arrow-back"
                      color="black"
                      size={28}
                      display={false}
                      onPress={() => navigation.goBack()}
                    />
                  ) : null,
              })}
            />
            <Stack.Screen
              name="OnboardingOne"
              component={OnboardingOneScreen}
              options={() => ({
                headerShown: false,
              })}
            />
            <Stack.Screen
              name="OnboardingTwo"
              component={OnboardingTwoScreen}
              options={() => ({
                headerShown: false,
              })}
            />
            <Stack.Screen
              name="OnboardingThree"
              component={OnboardingThreeScreen}
              options={() => ({
                headerShown: false,
              })}
            />
            <Stack.Screen
              name="ResetPW_request"
              component={ResetPW_RequestScreen}
              options={({ navigation }) => ({
                headerShown: true,
                headerStyle: { backgroundColor: Colors.disabledBeige },
                headerShadowVisible: false,
                headerTitle: () => (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={require("../assets/images/PrepUp-Black-Small.png")}
                      style={{ width: 34, height: 34 }}
                    />
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      Reset Password Request
                    </Text>
                  </View>
                ),
                headerLeft: () =>
                  // Check if the user can go back before showing the back button
                  navigation.canGoBack() ? (
                    <IconButton
                      icon="arrow-back"
                      color="black"
                      size={28}
                      display={false}
                      onPress={() => navigation.navigate("SignIn")}
                    />
                  ) : null,
              })}
            />
            <Stack.Screen
              name="ResetPW_Verifycode"
              component={ResetPW_VerifycodeScreen}
              options={({ navigation }) => ({
                headerShown: true,
                headerStyle: { backgroundColor: Colors.disabledBeige },
                headerShadowVisible: false,
                headerTitle: () => (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={require("../assets/images/PrepUp-Black-Small.png")}
                      style={{ width: 34, height: 34 }}
                    />
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      Verify Code
                    </Text>
                  </View>
                ),
                headerLeft: () =>
                  // Check if the user can go back before showing the back button
                  navigation.canGoBack() ? (
                    <IconButton
                      icon="arrow-back"
                      color="black"
                      size={28}
                      display={false}
                      onPress={() => navigation.goBack()}
                    />
                  ) : null,
              })}
            />
            <Stack.Screen
              name="ResetPW_CreatePW"
              component={ResetPW_CreatePWScreen}
              options={({ navigation }) => ({
                headerShown: true,
                headerStyle: { backgroundColor: Colors.disabledBeige },
                headerShadowVisible: false,
                headerTitle: () => (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={require("../assets/images/PrepUp-Black-Small.png")}
                      style={{ width: 34, height: 34 }}
                    />
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      Create New Password
                    </Text>
                  </View>
                ),
                headerLeft: () =>
                  // Check if the user can go back before showing the back button
                  navigation.canGoBack() ? (
                    <IconButton
                      icon="arrow-back"
                      color="black"
                      size={28}
                      display={false}
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
                                navigation.navigate("ResetPW_request");
                              },
                            },
                          ]
                        );
                      }}
                    />
                  ) : null,
              })}
            />
            <Stack.Screen
              name="ResetPW_Success"
              component={ResetPW_SuccessScreen}
              options={({ navigation }) => ({
                headerShown: true,
                headerStyle: { backgroundColor: Colors.disabledBeige },
                headerShadowVisible: false,
                headerTitle: () => (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={require("../assets/images/PrepUp-Black-Small.png")}
                      style={{ width: 34, height: 34 }}
                    />
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      Create New Password
                    </Text>
                  </View>
                ),
                headerLeft: () =>
                  // Check if the user can go back before showing the back button
                  navigation.canGoBack() ? (
                    <IconButton
                      icon="arrow-back"
                      color="black"
                      size={28}
                      display={false}
                      onPress={() => navigation.goBack()}
                    />
                  ) : null,
              })}
            />

            {/* <Stack.Screen
              name="Notifications"
              component={NotificationsScreen}
              options={({ navigation }) => ({
                headerShown: true,
                title: "",
                headerLeft: () =>
                  // Check if the user can go back before showing the back button
                  navigation.canGoBack() ? (
                    <IconButton
                      icon="arrow-back"
                      color="black"
                      size={28}
                      display={false}
                      onPress={() => navigation.goBack()}
                    />
                  ) : null,
              })}
            />
            <Stack.Screen
              name="QuizStarterScreen"
              component={QuizStarterScreen}
              options={({ navigation }) => ({
                headerShown: true,
                title: "",
                headerRight: null,
                headerLeft: () =>
                  // Check if the user can go back before showing the back button
                  navigation.canGoBack() ? (
                    <IconButton
                      icon="arrow-back"
                      color="black"
                      size={28}
                      display={false}
                      onPress={() => navigation.goBack()}
                    />
                  ) : null,
              })}
            />
            <Stack.Screen
              name="QuizScreen"
              component={QuizScreen}
              options={({ navigation }) => ({
                headerShown: true,
                title: "",
                headerLeft: () =>
                  // Check if the user can go back before showing the back button
                  navigation.canGoBack() ? (
                    <IconButton
                      icon="arrow-back"
                      color="black"
                      size={28}
                      display={false}
                      onPress={() => {
                        Alert.alert(
                          "Cancel the flashcard?",
                          "The process is unsaved, you will lose it.",
                          [
                            {
                              text: "Cancel",
                            },
                            {
                              text: "Confirm",
                              onPress: () => {
                                navigation.navigate("Category");
                              },
                            },
                          ]
                        );
                      }}
                    />
                  ) : null,
              })}
            />
            <Stack.Screen
              name="QuizFeedback"
              component={QuizFeedbackScreen}
              options={({ navigation }) => ({
                headerShown: true,
                title: "",
                headerLeft: () =>
                  // Check if the user can go back before showing the back button
                  navigation.canGoBack() ? (
                    <IconButton
                      icon="arrow-back"
                      color="black"
                      size={28}
                      display={false}
                      onPress={() => navigation.navigate("Category")}
                    />
                  ) : null,
              })}
            /> */}
          </Stack.Navigator>
        </AppContextProvider>
        <Toast config={toastConfig} />
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({});

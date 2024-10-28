import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet } from "react-native";
import InterviewSimulatorScreen from "../screens/InterviewSimulatorScreen";
import InterviewFeedbackScreen from "../screens/InterviewFeedbackScreen";
import JobSearchScreen from "../screens/JobSearchScreen";
import IconButton from "../components/common/IconButton";

import SplashScreen from "../screens/SplashScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AppContextProvider, { AppContext } from "../store/app-context";
import CategoryScreen from "../screens/CategoryScreen";
import QuizStarterScreen from "../screens/QuizStarterScreen";
import QuizFeedbackScreen from "../screens/QuizFeedbackScreen";
import QuizScreen from "../screens/QuizScreen";
import SigninFirstScreen from "../screens/SigninFirstScreen";
import SigninSecondScreen from "../screens/SigninSecondScreen";
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
            <Stack.Screen
              name="JobSearch"
              component={JobSearchScreen}
              options={{
                headerShown: true,
                title: "Job Finder",
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
            />
            <Stack.Screen
              name="InterviewSimulator"
              component={InterviewSimulatorScreen}
              options={({ navigation }) => ({
                headerShown: true,
                title: "Simulator",
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
                title: "Simulator Feedback",
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
                title: "STAR Master",
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
              name="StarQuizFeedback"
              component={StarQuizFeedbackScreen}
              options={({ navigation }) => ({
                headerShown: true,
                title: "Star Master Feedback",
                headerRight: null,
                headerLeft: () => (
                  // Check if the user can go back before showing the back button
                  // navigation.canGoBack() ? (
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
              name="SignIn-first"
              component={SigninFirstScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="SignIn-second"
              component={SigninSecondScreen}
              options={({ navigation }) => ({
                headerShown: true,
                title: "Sign In",
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
              name="Registration"
              component={RegistrationScreen}
              options={({ navigation }) => ({
                headerShown: true,
                title: "Registration",
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
                headerShown: true,
                title: "Registration",
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
                title: "Reset Password Request",
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
              name="ResetPW_Verifycode"
              component={ResetPW_VerifycodeScreen}
              options={({ navigation }) => ({
                headerShown: true,
                title: "Verify Code",
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
                title: "Create New Password",
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
                          "Are you sure you want to go back?",
                          "Your changes won't be saved. Do you want to proceed?",
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
                title: "Create New Password",
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
        <Toast />
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({});

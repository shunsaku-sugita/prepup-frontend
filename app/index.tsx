import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet } from "react-native";
import InterviewSimulatorScreen from "../screens/InterviewSimulatorScreen";
import InterviewFeedbackScreen from "../screens/InterviewFeedbackScreen";
import JobSearchScreen from "../screens/JobSearchScreen";
import IconButton from "../components/common/IconButton";
import NotificationsScreen from "../screens/NotificationsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AppContextProvider from "../store/app-context";
import CategoryScreen from "../screens/CategoryScreen";
import QuizStarterScreen from "../screens/QuizStarterScreen";
import QuizFeedbackScreen from "../screens/QuizFeedbackScreen";
import QuizScreen from "../screens/QuizScreen";
import StarQuizScreen from "../screens/StarQuizScreen";
import StarQuizFeedbackScreen from "../screens/StarQuizFeedbackScreen";
import { useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
            />
            <Stack.Screen
              name="StarQuiz"
              component={StarQuizScreen}
              options={({ navigation }) => ({
                headerShown: true,
                title: "Star Master",
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
                          "Cancel the Star Master?",
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
          </Stack.Navigator>
        </AppContextProvider>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({});

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet } from "react-native";
import InterviewSimulatorScreen from "../screens/InterviewSimulatorScreen";
import InterviewFeedbackScreen from "../screens/InterviewFeedbackScreen";
import JobSearchScreen from "../screens/JobSearchScreen";
import IconButton from "../components/common/IconButton";
import HeaderRightIcons from "../components/common/HeaderRightIcons";
import NotificationsScreen from "../screens/NotificationsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Greeting from "../components/interview/Greeting";
import AppContextProvider from "../store/app-context";
import CategoryScreen from "../screens/CategoryScreen";
import QuizStarterScreen from "../screens/QuizStarterScreen";
import QuizFeedbackScreen from "../screens/QuizFeedbackScreen";
import QuizScreen from "../screens/QuizScreen";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function App() {
  const navigation = useNavigation();
  return (
    <>
      <StatusBar style="auto" />
      <AppContextProvider>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            headerRight: () => <HeaderRightIcons color="black" />,
          }}
        >
          <Stack.Screen
            name="Category"
            component={CategoryScreen}
            options={{
              headerShown: true,
              headerLeft: () => <Greeting />,
            }}
          />
          <Stack.Screen
            name="JobSearch"
            component={JobSearchScreen}
            options={{
              headerShown: true,
              title: "",
              headerLeft: () => (
                <IconButton
                  icon="arrow-back"
                  color="black"
                  size={28}
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
              title: "",
              headerLeft: () =>
                // Check if the user can go back before showing the back button
                navigation.canGoBack() ? (
                  <IconButton
                    icon="arrow-back"
                    color="black"
                    size={28}
                    onPress={() => {
                      Alert.alert(
                        "Cancel the interview?",
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
              title: "",
              headerLeft: () =>
                // Check if the user can go back before showing the back button
                navigation.canGoBack() ? (
                  <IconButton
                    icon="arrow-back"
                    color="black"
                    size={28}
                    onPress={() => navigation.navigate("Category")}
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
                    onPress={() => navigation.goBack()}
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
                    onPress={() => navigation.goBack()}
                  />
                ) : null,
            })}
          />
          <Stack.Screen
            name="Notifications"
            component={NotificationsScreen}
            options={({ navigation }) => ({
              headerShown: true,
              headerLeft: () =>
                // Check if the user can go back before showing the back button
                navigation.canGoBack() ? (
                  <IconButton
                    icon="arrow-back"
                    color="black"
                    size={28}
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
                    onPress={() => navigation.goBack()}
                  />
                ) : null,
            })}
          />
        </Stack.Navigator>
      </AppContextProvider>
    </>
  );
}

const styles = StyleSheet.create({});

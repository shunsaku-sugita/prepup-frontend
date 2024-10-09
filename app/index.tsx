import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet, Text, View } from "react-native";
import InterviewSimulatorScreen from "../screens/InterviewSimulatorScreen";
import InterviewFeedbackScreen from "../screens/InterviewFeedbackScreen";
import JobSearchScreen from "../screens/JobSearchScreen";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "../components/common/IconButton";
import HeaderRightIcons from "../components/common/HeaderRightIcons";
import NotificationsScreen from "../screens/NotificationsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Greeting from "../components/interview/Greeting";
import AppContextProvider from "../store/app-context";
import CategoryScreen from "../screens/CategoryScreen";
import QuizCategoryScreen from "../screens/QuizCategoryScreen";
import QuizFeedbackScreen from "../screens/QuizFeedbackScreen";
import QuizScreen from "../screens/QuizScreen";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const AppOverview = ({ navigation }) => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarInactiveTintColor: "lightgray",
        tabBarActiveTintColor: "black",
        tabBarInactiveBackgroundColor: "white",
        tabBarActiveBackgroundColor: "white",
        tabBarStyle: { backgroundColor: "white" },
        tabBarLabelStyle: { fontSize: 14 },
        headerTitle: "",
        headerRight: ({ tintColor }) => <HeaderRightIcons color={tintColor} />,
      }}
    >
      {/* <BottomTab.Screen
        name="InterviewSimulator"
        component={InterviewSimulatorScreen}
        options={{
          title: "Simulator",
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubble-ellipses" color={color} size={30} />
          ),
          // headerLeft: () => <Greeting />,
        }}
      /> */}
      <BottomTab.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          title: "Simulator",
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubble-ellipses" color={color} size={30} />
          ),
          headerLeft: () => <Greeting />,
        }}
      />
      <BottomTab.Screen
        name="JobSearch"
        component={JobSearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="briefcase" color={color} size={30} />
          ),
        }}
      />
      <BottomTab.Screen
        name="FlashCard"
        component={QuizCategoryScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="sparkles-outline" color={color} size={30} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default function App() {
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
            name="AppOverview"
            component={AppOverview}
            options={{ headerShown: false }}
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

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import InterviewSimulatorScreen from "../screens/InterviewSimulatorScreen";
import InterviewFeedbackScreen from "../screens/InterviewFeedbackScreen";
import JobSearchScreen from "../screens/JobSearchScreen";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "../components/common/IconButton";
import NotificationsScreen from "../screens/NotificationsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Greeting from "../components/interview/Greeting";
import AppContextProvider from "../store/app-context";
import QuizCategoryScreen from "../screens/QuizCategoryScreen";
import QuizFeedbackScreen from "../screens/QuizFeedbackScreen";
import QuizScreen from "../screens/QuizScreen";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const InterviewOverview = ({ navigation }) => {
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
        headerRight: ({ tintColor }) => (
          <View style={styles.headerRightContainer}>
            <IconButton
              icon="notifications-outline"
              color={tintColor}
              size={30}
              onPress={() => {
                navigation.navigate("Notifications");
              }}
            />
            <IconButton
              icon="person-circle-outline"
              color={tintColor}
              size={30}
              onPress={() => {
                navigation.navigate("Profile");
              }}
            />
          </View>
        ),
      }}
    >
      <BottomTab.Screen
        name="InterviewSimulator"
        component={InterviewSimulatorScreen}
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
            <Ionicons name="search" color={color} size={30} />
          ),
        }}
      />
      <BottomTab.Screen
        name="FlashCard"
        component={QuizCategoryScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="grid" color={color} size={30} />
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
          }}
        >
          <Stack.Screen
            name="InterviewOverview"
            component={InterviewOverview}
            options={{ headerShown: false }}
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

const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: "row",
    columnGap: 10,
    paddingRight: 12,
  },
});

import {
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import WideButton from "@/components/common/WideButton";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import { Colors } from "@/constants/Colors";
import Toast from "react-native-toast-message";
import * as SecureStore from "expo-secure-store";
import { toastConfig } from "@/components/toast/ToastComponent";
import { emptyToken, getProfile } from "@/components/services/api"; // Ensure this path is correct

const ProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [occupation, setOccupation] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [privacyAccepted, setPrivacyAccepted] = useState(true);
  const [isGmailLogin, setIsGmailLogin] = useState(false);

  // Fetch user profile data when the screen mounts
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const profileData = await getProfile();
        if (profileData) {
          setName(`${profileData.givenName} ${profileData.familyName}`);
          setUsername(profileData.userName);
          setEmail(profileData.email);
          setOccupation(profileData.occupation || "");
          setIsGmailLogin(profileData?.isGmailLogin);
        } else {
          console.error("Failed to load user profile data");
        }
      } catch (error) {
        console.error("Error loading profile data:", error);
      }
    };

    loadUserProfile();
  }, []);

  // Update profile information when navigating back from EditProfileScreen
  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.updatedProfile) {
        const updatedProfile = route.params.updatedProfile;
        setName(`${updatedProfile.givenName} ${updatedProfile.familyName}`);
        setUsername(updatedProfile.userName);
        setOccupation(updatedProfile.occupation || "");
      }
    }, [route.params?.updatedProfile])
  );

  const handleEditPress = () => {
    navigation.navigate("EditProfile");
  };

  const toggleNotifications = () =>
    setNotificationsEnabled((previousState) => !previousState);
  const toggleTerms = () => setTermsAccepted((previousState) => !previousState);
  const togglePrivacy = () =>
    setPrivacyAccepted((previousState) => !previousState);

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete your account",
      "This action will remove your data in the database permanently and cannot be undone. Please confirm if you want to proceed.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            console.log("Account deleted");
          },
        },
      ]
    );
  };

  // Show toast if saveSuccess is true
  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.saveSuccess) {
        Toast.show({
          type: "success",
          text1: "Successfully changed personal information",
          position: "top",
          autoHide: true,
          visibilityTime: 3000,
        });
        navigation.setParams({ saveSuccess: false });
      }
    }, [route.params?.saveSuccess])
  );

  // Logout confirmation dialog
  const handleLogout = async () => {
    Alert.alert(
      "Are you sure you want to logout?",
      "Your session will be ended.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Continue",
          style: "destructive", // or "default"
          onPress: async () => {
            try {
              // Clear user data from SecureStore
              await SecureStore.deleteItemAsync("authToken");
              await SecureStore.deleteItemAsync("userEmail");

              // Show a success message or Toast
              Toast.show({
                type: "success",
                text1: "Logged out successfully",
                position: "top",
                autoHide: true,
                visibilityTime: 3000,
              });

              // Navigate to the sign-in screen
              navigation.reset({
                index: 0,
                routes: [{ name: "SignIn" }], // Replace "SignIn" with the actual name of your sign-in route
              });
            } catch (error) {
              console.error("Error during logout:", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const profileSections = [
    {
      key: "personalInfo",
      renderItem: () => (
        <View style={[styles.sectionContainer, styles.whiteBackground]}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.sectionSeparator} />
          <View style={styles.infoContainer}>
            <ProfileField label="Name" value={name} />
            <ProfileField label="Username" value={username} />
            <ProfileField label="Email" value={email} />
            <ProfileField
              label="Occupation"
              value={occupation}
              noSeparator
              isWarning={occupation === ""} // Show warning if occupation is empty
            />
          </View>
          <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
            <Text style={styles.editButtonText}>Edit</Text>
            <Ionicons name="pencil" size={16} color="black" />
          </TouchableOpacity>
        </View>
      ),
    },
    {
      key: "password",
      renderItem: () => (
        <View
          style={[
            styles.sectionContainer,
            styles.whiteBackground,
            isGmailLogin && styles.disabledSection, // Apply disabled styling if Gmail login
          ]}
          pointerEvents={isGmailLogin ? "none" : "auto"} // Disable interactions if Gmail login
        >
          <Text
            style={[
              styles.sectionTitle,
              isGmailLogin && { color: "#B0B0B0" }, // Adjust text color if disabled
            ]}
          >
            Password
          </Text>
          <View style={styles.sectionSeparator} />
          <View style={styles.infoContainer}>
            <View style={styles.fieldContainer}>
              <View style={styles.fieldRow}>
                <Text
                  style={[
                    styles.fieldLabel,
                    isGmailLogin && { color: "#B0B0B0" },
                  ]}
                >
                  Change Password
                </Text>
                <View style={styles.passwordContainer}>
                  <Text
                    style={[
                      styles.passwordText,
                      isGmailLogin && { color: "#B0B0B0" },
                    ]}
                  >
                    **********
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={[
              styles.editButton,
              isGmailLogin && styles.disabledButton, // Apply additional styles if disabled
            ]}
            onPress={() =>
              !isGmailLogin && navigation.navigate("EditPW_ChangePW")
            }
            disabled={isGmailLogin} // Disables the touch interaction
          >
            <Text
              style={[
                styles.editButtonText,
                isGmailLogin && { color: "#B0B0B0" },
              ]}
            >
              Edit
            </Text>
            <Ionicons
              name="pencil"
              size={16}
              color={isGmailLogin ? "#B0B0B0" : "black"}
            />
          </TouchableOpacity>
        </View>
      ),
    },
    {
      key: "notifications",
      renderItem: () => (
        <View style={[styles.sectionContainer, styles.whiteBackground]}>
          <ToggleRow
            label="Enable Notification"
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
          />
        </View>
      ),
    },
    {
      key: "termsOfUse",
      renderItem: () => (
        <View style={[styles.sectionContainer, styles.whiteBackground]}>
          <ToggleRow
            label="Terms of Use"
            value={termsAccepted}
            onValueChange={toggleTerms}
          />
        </View>
      ),
    },
    {
      key: "privacyPolicy",
      renderItem: () => (
        <View style={[styles.sectionContainer, styles.whiteBackground]}>
          <ToggleRow
            label="Privacy Policy"
            value={privacyAccepted}
            onValueChange={togglePrivacy}
          />
        </View>
      ),
    },
    {
      key: "deleteAccount",
      renderItem: () => (
        <View style={[styles.sectionContainer, styles.whiteBackground]}>
          <View style={styles.deleteRow}>
            <Text style={styles.deleteTitle}>Delete your account</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDeleteAccount}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ),
    },
    {
      key: "logout",
      renderItem: () => (
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      ),
    },
  ];

  return (
    <>
      <FlatList
        data={profileSections}
        renderItem={({ item }) => item.renderItem()}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.listContainer}
      />
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    </>
  );
};

// Reusable Profile Field Component
const ProfileField = ({ label, value, noSeparator, isWarning }) => (
  <View style={styles.fieldContainer}>
    <View style={styles.fieldRow}>
      <Text style={[styles.fieldLabel, isWarning && styles.occupationWarning]}>
        {label}
      </Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
    {!noSeparator && <View style={styles.fieldSeparator} />}
  </View>
);

const ToggleRow = ({ label, value, onValueChange }) => (
  <View style={[styles.toggleRow, styles.toggleRowSmaller]}>
    <Text>{label}</Text>
    <Switch value={value} onValueChange={onValueChange} />
  </View>
);

export default ProfileScreen;

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    backgroundColor: Colors.defaultBeige,
  },
  sectionContainer: {
    borderRadius: 8,
    marginBottom: 16,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  whiteBackground: {
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  sectionSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  infoContainer: {
    paddingHorizontal: 16,
  },
  fieldContainer: {
    marginBottom: 0,
  },
  fieldRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  fieldValue: {
    fontSize: 14,
    fontWeight: "400",
    color: "#333",
  },
  fieldSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    width: "100%",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#E7EFFF",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  editButtonDisable: {
    backgroundColor: "#D3D3D3",
  },
  disabledSection: {
    backgroundColor: "#F5F5F5", // Lighter background color
  },
  disabledButton: {
    backgroundColor: "#D3D3D3", // Disabled button color
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
    marginRight: 4,
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
  },
  toggleRowSmaller: {
    width: "100%",
    alignSelf: "center",
  },
  deleteRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  deleteTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  deleteButton: {
    backgroundColor: "red",
    paddingVertical: 13,
    paddingHorizontal: 17.5,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    fontSize: 14,
    color: "#333",
  },
  logoutContainer: {
    flex: 1,
    alignItems: "center",
    marginBottom: 50,
  },
  logoutButton: {
    backgroundColor: Colors.defaultBlue,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    width: "100%",
  },
  logoutButtonText: {
    color: "#FEFEFF",
    fontSize: 16,
    fontWeight: "800",
  },
  occupationWarning: {
    fontWeight: "bold",
    color: "red",
  },
});

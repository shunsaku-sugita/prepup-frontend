import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import WideButton from "@/components/common/WideButton";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  // State variables for editable fields and toggles
  const [name, setName] = useState("Juan Garcia");
  const [username, setUsername] = useState("juangarcia");
  const [email, setEmail] = useState("jg@gmail.com");
  const [occupation, setOccupation] = useState("Software Developer");
  const [password, setPassword] = useState("**********");
  const [passwordIsSecure, setPasswordIsSecure] = useState(true); // Toggle password visibility
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [privacyAccepted, setPrivacyAccepted] = useState(true);
  const navigation = useNavigation(); 

  const handleEditPress = () => {
    navigation.navigate("EditProfile"); // Navigate to the EditProfileScreen
  };

  // Toggle functions
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
            // Logic to delete the account
            console.log("Account deleted");
          },
        },
      ]
    );
  };

  // Data array for FlatList
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
            <ProfileField label="Occupation" value={occupation} noSeparator />
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
        <View style={[styles.sectionContainer, styles.whiteBackground]}>
          <Text style={styles.sectionTitle}>Password</Text>
          <View style={styles.sectionSeparator} />
          <View style={styles.infoContainer}>
            <View style={styles.fieldContainer}>
              <View style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>Change Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    value={password}
                    secureTextEntry={passwordIsSecure}
                    editable={false}
                  />
                  <TouchableOpacity onPress={() => setPasswordIsSecure(!passwordIsSecure)}>
                    <Ionicons
                      name={passwordIsSecure ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => navigation.navigate("ResetPW_CreatePW")}>
            <Text style={styles.editButtonText}>Edit</Text>
            <Ionicons name="pencil" size={16} color="black" />
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
            <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
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
          <WideButton title="Logout" color="white" onPress={() => console.log("Logged out")} />
        </View>
      ),
    },
  ];

  return (
    <FlatList
      data={profileSections}
      renderItem={({ item }) => item.renderItem()}
      keyExtractor={(item) => item.key}
      contentContainerStyle={styles.listContainer}
    />
  );
};

// Reusable Profile Field Component
const ProfileField = ({ label, value, noSeparator }) => (
  <View style={styles.fieldContainer}>
    <View style={styles.fieldRow}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
    {!noSeparator && <View style={styles.fieldSeparator} />}
  </View>
);

// Reusable Toggle Row Component
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
    backgroundColor: "#F7F7F7",
  },
  sectionContainer: {
    borderRadius: 8,
    marginBottom: 16,
    shadowRadius: 4,
    borderWidth:1,
    borderColor:"#E0E0E0"
   
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
    paddingVertical: 10,
  },
  deleteTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  deleteButton: {
    backgroundColor: "red",
    paddingVertical: 8,
    paddingHorizontal: 16,
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
    marginRight: 8,
  },
  logoutContainer: {
    flex: 1,
    alignItems: "center",
    marginBottom: 50,
  },
});

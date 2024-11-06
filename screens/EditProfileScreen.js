import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import WideButton from "@/components/common/WideButton";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "@/constants/Colors";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/components/toast/ToastComponent";
import { updateProfile, getProfile } from "@/components/services/api";

const EditProfileScreen = () => {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [occupation, setOccupation] = useState("");

  const [firstNameIsValid, setFirstNameIsValid] = useState(true);
  const [usernameIsValid, setUsernameIsValid] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Add a state to track which field is focused
  const [focusedField, setFocusedField] = useState(null);

  // Load initial profile data
  useEffect(() => {
    const loadUserProfile = async () => {
      const profileData = await getProfile();
      console.log("Fetched profile data:", profileData); // Debugging line to verify data from getProfile
      if (profileData) {
        setFirstName(profileData.givenName || "");
        setLastName(profileData.familyName || "");
        setUsername(profileData.userName || "");
        setEmail(profileData.email || "");
        setOccupation(profileData.occupation || "");
      }
    };
    loadUserProfile();
  }, []);

  // Validation functions
  const validateFirstName = (name) => /^[a-zA-Z]+$/.test(name.trim());
  const validateUsername = (username) =>
    /^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/.test(username.trim());

  useEffect(() => {
    setFirstNameIsValid(validateFirstName(firstName));
  }, [firstName]);

  useEffect(() => {
    setUsernameIsValid(validateUsername(username));
  }, [username]);

  const handleSave = async () => {
    setIsSubmitted(true);

    // Check if any changes were made to the form data
    const profileDataToUpdate = {
      givenName: firstName,
      familyName: lastName,
      occupation,
    };

    // Retrieve the current profile data for comparison
    const originalProfileData = await getProfile();

    if (username !== originalProfileData.userName) {
      profileDataToUpdate.userName = username;
    }

    const hasChanges =
      profileDataToUpdate.givenName !== originalProfileData.givenName ||
      profileDataToUpdate.familyName !== originalProfileData.familyName ||
      profileDataToUpdate.userName !== originalProfileData.userName ||
      profileDataToUpdate.occupation !== originalProfileData.occupation;

    if (!hasChanges) {
      // If there are no changes, show success alert and navigate back
      Toast.show({
        type: "success",
        text1: "Profile saved successfully",
        position: "top",
        autoHide: true,
        visibilityTime: 3000,
      });
      navigation.navigate("Profile", {
        updatedProfile: {
          givenName: firstName,
          familyName: lastName,
          userName: username,
          occupation,
        },
      });

      return;
    }

    try {
      console.log("Profile data to be updated:", profileDataToUpdate);

      const response = await updateProfile(profileDataToUpdate);
      if (response?.message === "Profile updated successfully") {
        Toast.show({
          type: "success",
          text1: "Sucessfully change personal information",
          position: "top",
          autoHide: true,
          visibilityTime: 3000,
        });
        navigation.navigate("Profile", {
          updatedProfile: {
            givenName: firstName,
            familyName: lastName,
            userName: username,
            occupation,
          },
        });
      } else {
        // Show a single error toast when the update fails
        Toast.show({
          type: "error",
          text1: "Failed to update profile",
          position: "top",
          autoHide: true,
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      // Show a single error toast in case of a catch error
      Toast.show({
        type: "error",
        text1: "Failed to update profile",
        position: "top",
        autoHide: true,
        visibilityTime: 3000,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContents}>
        {/* First and Last Name */}
        <View style={styles.nameHorizontalContainer}>
          <View style={styles.nameFormContainer}>
            <Text style={styles.fieldLabel}>
              First Name <Text style={styles.asterisk}>*</Text>
            </Text>
            <View
              style={[
                !firstNameIsValid && isSubmitted
                  ? styles.fieldAlert
                  : styles.nameField,
                focusedField === "firstName" && styles.focusedField, // Apply blue border if focused
              ]}
            >
              <TextInput
                placeholder="First Name"
                placeholderTextColor="#aaa"
                value={firstName}
                onChangeText={setFirstName}
                onFocus={() => setFocusedField("firstName")}
                onBlur={() => setFocusedField(null)}
              />
            </View>
            {!firstNameIsValid && isSubmitted && (
              <View style={styles.alertContainer}>
                <Ionicons name="alert-circle-outline" color="red" size={20} />
                <Text style={styles.alertText}>First name is required</Text>
              </View>
            )}
          </View>
          <View style={styles.nameFormContainer}>
            <Text style={styles.fieldLabel}>Last Name</Text>
            <View
              style={[
                styles.nameField,
                focusedField === "lastName" && styles.focusedField, // Apply blue border if focused
              ]}
            >
              <TextInput
                placeholder="Last Name"
                placeholderTextColor="#aaa"
                value={lastName}
                onChangeText={setLastName}
                onFocus={() => setFocusedField("lastName")}
                onBlur={() => setFocusedField(null)}
              />
            </View>
          </View>
        </View>

        {/* Username */}
        <View style={styles.formContainer}>
          <Text style={styles.fieldLabel}>
            Username <Text style={styles.asterisk}>*</Text>
          </Text>
          <View
            style={[
              !usernameIsValid && isSubmitted
                ? styles.fieldAlert
                : styles.emailField,
              focusedField === "username" && styles.focusedField, // Apply blue border if focused
            ]}
          >
            <TextInput
              placeholder="Enter a username"
              placeholderTextColor="#aaa"
              value={username}
              onChangeText={setUsername}
              onFocus={() => setFocusedField("username")}
              onBlur={() => setFocusedField(null)}
            />
          </View>
          {!usernameIsValid && isSubmitted && (
            <View style={styles.alertContainer}>
              <Ionicons name="alert-circle-outline" color="red" size={20} />
              <Text style={styles.alertText}>Username is required</Text>
            </View>
          )}
        </View>

        {/* Email */}
        <View style={styles.formContainer}>
          <Text style={styles.fieldLabel}>
            Email <Text style={styles.asterisk}>*</Text>
          </Text>
          <View style={[styles.emailField]}>
            <TextInput value={email} editable={false} />
          </View>
        </View>

        {/* Occupation */}
        <View style={styles.formContainer}>
          <Text style={styles.fieldLabel}>Occupation</Text>
          <View
            style={[
              styles.emailField,
              focusedField === "occupation" && styles.focusedField, // Apply blue border if focused
            ]}
          >
            <TextInput
              placeholder="Occupation"
              placeholderTextColor="#aaa"
              value={occupation}
              onChangeText={setOccupation}
              onFocus={() => setFocusedField("occupation")}
              onBlur={() => setFocusedField(null)}
            />
          </View>
        </View>
      </View>

      {/* Save Button */}
      <View style={styles.buttonContainer}>
        <WideButton title="Save" color="white" onPress={handleSave} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: Colors.disabledBeige,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    alignSelf: "center",
  },
  mainContents: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 30,
  },
  nameHorizontalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  nameFormContainer: {
    width: "48%",
  },
  formContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  asterisk: {
    color: "red",
  },
  nameField: {
    borderWidth: 1,
    borderColor: Colors.disabledBeige,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: "white",
  },
  emailField: {
    borderWidth: 1,
    borderColor: Colors.disabledBeige,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: "white",
  },
  fieldAlert: {
    borderWidth: 2,
    borderColor: "red",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  focusedField: {
    borderColor: "blue", // Blue border on focus
  },
  alertContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  alertText: {
    color: "red",
    fontSize: 12,
    marginLeft: 4,
  },
  buttonContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
});

export default EditProfileScreen;

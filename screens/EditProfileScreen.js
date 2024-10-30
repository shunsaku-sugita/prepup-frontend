import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Alert,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import WideButton from "@/components/common/WideButton";
  import { Ionicons } from "@expo/vector-icons";
  import { useNavigation } from "@react-navigation/native";
  
  const EditProfileScreen = () => {
    const navigation = useNavigation(); // Get the navigation object
  
    const [firstName, setFirstName] = useState("Juan");
    const [lastName, setLastName] = useState("Garcia");
    const [username, setUsername] = useState("juangarcia");
    const [email, setEmail] = useState("juangarc@gmail.com");
    const [occupation, setOccupation] = useState("Software Developer");
  
    const [firstNameIsValid, setFirstNameIsValid] = useState(true);
    const [usernameIsValid, setUsernameIsValid] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
  
    // Validation functions
    const validateFirstName = (name) => /^[a-zA-Z]+$/.test(name.trim());
    const validateUsername = (username) => /^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/.test(username.trim());
  
    // Real-time validation
    useEffect(() => {
      setFirstNameIsValid(validateFirstName(firstName));
    }, [firstName]);
  
    useEffect(() => {
      setUsernameIsValid(validateUsername(username));
    }, [username]);
  
    const handleSave = () => {
      setIsSubmitted(true);
  
      // Check all validations
      if (!firstNameIsValid || !usernameIsValid) {
        Alert.alert("Invalid inputs", "Please fix the highlighted fields.");
        return;
      }
  
      // Logic to save changes (use API call if needed)
      console.log("Saved successfully!");
  
      // Navigate back to Profile screen
      navigation.goBack(); // This will return to the previous screen
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
                style={
                  !firstNameIsValid && isSubmitted
                    ? styles.fieldAlert
                    : styles.nameField
                }
              >
                <TextInput
                  placeholder="First Name"
                  placeholderTextColor="#aaa"
                  value={firstName}
                  onChangeText={setFirstName}
                />
              </View>
              {!firstNameIsValid && isSubmitted && (
                <View style={styles.alertContainer}>
                  <Ionicons name="alert-circle-outline" color="red" size={20} />
                  <Text style={styles.alertText}>Please type one word with letters.</Text>
                </View>
              )}
            </View>
            <View style={styles.nameFormContainer}>
              <Text style={styles.fieldLabel}>Last Name</Text>
              <View style={styles.nameField}>
                <TextInput
                  placeholder="Last Name "
                  placeholderTextColor="#aaa"
                  value={lastName}
                  onChangeText={setLastName}
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
              style={
                !usernameIsValid && isSubmitted
                  ? styles.fieldAlert
                  : styles.emailField
              }
            >
              <TextInput
                placeholder="Enter a username"
                placeholderTextColor="#aaa"
                value={username}
                onChangeText={setUsername}
              />
            </View>
            {!usernameIsValid && isSubmitted && (
              <View style={styles.alertContainer}>
                <Ionicons name="alert-circle-outline" color="red" size={20} />
                <Text style={styles.alertText}>This field cannot be left blank.</Text>
              </View>
            )}
          </View>
  
          {/* Email */}
          <View style={styles.formContainer}>
            <Text style={styles.fieldLabel}>
              Email <Text style={styles.asterisk}>*</Text>
            </Text>
            <View style={[styles.emailField, { backgroundColor: "#eee" }]}>
              <TextInput
                value={email}
                editable={false}
              />
            </View>
          </View>
  
          {/* Occupation */}
          <View style={styles.formContainer}>
            <Text style={styles.fieldLabel}>Occupation</Text>
            <View style={styles.emailField}>
              <TextInput
                placeholder="Occupation"
                placeholderTextColor="#aaa"
                value={occupation}
                onChangeText={setOccupation}
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
      backgroundColor: "#fff",
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
      borderColor: "#bbb",
      borderRadius: 4,
      paddingHorizontal: 8,
      paddingVertical: 12,
    },
    emailField: {
      borderWidth: 1,
      borderColor: "#bbb",
      borderRadius: 4,
      paddingHorizontal: 8,
      paddingVertical: 12,
    },
    fieldAlert: {
      borderWidth: 2,
      borderColor: "red",
      borderRadius: 4,
      paddingHorizontal: 8,
      paddingVertical: 12,
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
  
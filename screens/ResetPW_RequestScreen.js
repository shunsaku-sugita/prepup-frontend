import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import WideButton from "@/components/common/WideButton";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import TitleText from "@/components/common/TitleText";
import { Colors } from "@/constants/Colors";

const ResetPW_RequestScreen = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigation = useNavigation();

  // general email validation function(requires **@**.** format)
  const emailValidation = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  // real-time validation for email
  useEffect(() => {
    const isEmailValid = emailValidation(enteredEmail);
    setEmailIsValid(isEmailValid);
  }, [enteredEmail]);

  const VerifyHandler = () => {
    setIsSubmitted(true);

    if (emailIsValid) {
      // use verify API later
      navigation.navigate("ResetPW_Verifycode");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContents}>
        <View style={styles.titleAndTextContainer}>
          <TitleText text="Reset Your Password" />
          <Text>
            Enter the email associated with your account and we’ll send an email
            with instructions to reset your password.
          </Text>
        </View>
        <View style={styles.formContainer}>
          <View>
            <Text style={styles.fieldLabel}>Email{" "}<Text style={styles.astarisk}>*</Text></Text>
          </View>
          <View
            style={
              !emailIsValid && isSubmitted
                ? styles.emailFieldAlert
                : styles.emailField
            }
          >
            <TextInput
              placeholder="Enter your email address"
              placeholderTextColor={Colors.placeHolderTextGray}
              keyboardType="email-address"
              autoCapitalize="none"
              value={enteredEmail}
              onChangeText={(text) => setEnteredEmail(text)}
            />
          </View>
          {!emailIsValid && isSubmitted && (
            <View style={styles.alertContainer}>
              <Ionicons name="alert-circle-outline" color={Colors.errorRed} size={20} />
              <Text style={styles.alertText}>Invalid email.</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <WideButton
          title="Verify"
          color="white"
          // need to check if user's info matches to our database
          onPress={VerifyHandler}
        />
      </View>
    </View>
  );
};

export default ResetPW_RequestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultBeige,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 12,
    paddingTop: 100,
  },
  mainContents: {
    flex: 5,
  },
  titleAndTextContainer: {
    marginBottom: 50,
    justifyContent: "flex-start",
    rowGap: 20,
    width: 340,
  },
  formContainer: {
    width: 340,
    rowGap: 4,
  },
  fieldLabel: {
    fontWeight: 'bold',
  },
  astarisk: {
    color: Colors.defaultRed,
  },
  emailField: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.defaultBeige,
    borderRadius: 4,
    backgroundColor: 'white',
    width: "100%",
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  emailFieldAlert: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.errorRed,
    borderRadius: 4,
    width: "100%",
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  alertContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    columnGap: 2,
  },
  alertText: {
    color: Colors.errorRed,
    fontWeight: 500,
  },
  buttonContainer: {
    flex: 1,
    marginBottom: 50,
  },
});

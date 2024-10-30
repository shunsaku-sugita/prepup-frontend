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

const ResetPW_VerifycodeScreen = () => {
  const [enteredCode, setEnteredCode] = useState("");
  const [codeIsValid, setCodeIsValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigation = useNavigation();

  // code validation function for a 6-digit numbers(0-9)
  // ==>> need to check if the code matches to our sent code with API!!
  const codeValidation = (code) => {
    const codeRegex = /^\d{6}$/;
    return codeRegex.test(code.trim());
  };

  // real-time validation for 6 digits code
  useEffect(() => {
    const isCodeValid = codeValidation(enteredCode);
    setCodeIsValid(isCodeValid);
  }, [enteredCode]);

  const VerifyHandler = () => {
    setIsSubmitted(true);

    if (codeIsValid) {
      // use verify API later
      navigation.navigate("ResetPW_CreatePW");
    }
  };

  const resendCodeHandler = () => {
    // use API to resend a code
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContents}>
        <View style={styles.titleAndTextContainer}>
          <TitleText text="Change Password" />
          <Text>
            Enter the verify code that we sent an email with instructions to
            reset your password.
          </Text>
        </View>
        <View style={styles.formContainer}>
          <View>
            <Text style={styles.fieldLabel}>Enter the code *</Text>
          </View>
          <View
            style={
              !codeIsValid && isSubmitted
                ? styles.codeFieldAlert
                : styles.codeField
            }
          >
            <TextInput
              placeholder="_ _ _ _ _ _"
              placeholderTextColor={"#aaa"}
              keyboardType="number-pad"
              maxLength={6}
              value={enteredCode}
              onChangeText={(text) => setEnteredCode(text)}
            />
          </View>
          {!codeIsValid && isSubmitted && (
            <View style={styles.alertContainer}>
              <Ionicons name="alert-circle-outline" color="red" size={20} />
              <Text style={styles.alertText}>Code does not match.</Text>
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
        <View style={styles.codeTextContainer}>
          <Text style={styles.simpleButtonText}>Didn't receive code? </Text>
          <TouchableOpacity
            style={styles.simpleButton}
            onPress={resendCodeHandler}
          >
            <Text style={styles.resendCodeText}>Resend Code</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ResetPW_VerifycodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    fontWeight: "bold",
  },
  codeField: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 4,
    width: "100%",
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  codeFieldAlert: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "red",
    borderRadius: 4,
    width: "100%",
    padding: 8,
  },
  alertContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    columnGap: 2,
  },
  alertText: {
    color: "red",
    fontWeight: 500,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    rowGap: 10,
    marginBottom: 50,
  },
  codeTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  simpleButton: {
    marginTop: 10,
  },
  simpleButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "blue",
  },
  resendCodeText: {
    color: "blue",
    textDecorationLine: "underline",
    marginBottom: 10,
  },
});

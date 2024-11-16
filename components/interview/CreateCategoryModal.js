import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useContext, useState } from "react";
import TitleText from "../common/TitleText";
import WideButton from "../common/WideButton";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Toast from "react-native-toast-message";
import { AppContext } from "@/store/app-context";

const CreateCategoryModal = ({
  setModalVisible,
  setIsSaved,
  selectedCategoryQuestions,
  saveInterviewQuestions,
}) => {
  const { fontsLoaded } = useContext(AppContext);

  const [typedText, setTypedText] = useState("");
  const textInputHandler = (enteredText) => {
    setTypedText(enteredText);
  };

  // check if the input contains at least one word or number
  const isValidInput = () => {
    return /\w+/.test(typedText.trim()); // This regex checks for any word character or number
  };

  // onPress handler function to save category/questions
  const saveCategoryQuestionsHandler = async () => {
    if (!typedText.trim()) return;

    setIsSaved(true);

    // Check if selectedCategoryQuestions is an array
    const questionsArray = Array.isArray(selectedCategoryQuestions)
      ? selectedCategoryQuestions.map((question) => question.trim())
      : []; // default to an empty array if it's not an array

    // // Attempt to save the new category with API
    const success = await saveInterviewQuestions(typedText, questionsArray);

    console.log("Success ===> ");
    console.log(success);

    setModalVisible(false);

    if (success) {
      Toast.show({
        type: "success",
        text1: `New category has been successfully added!`,
        text2: "",
        position: "top",
        autoHide: true,
        visibilityTime: 3000,
      });
    } else {
      Toast.show({
        type: "info",
        text1: "Failed to save a new category.",
        text2: "",
        position: "top",
        autoHide: true,
        visibilityTime: 3000,
      });
    }

    setIsSaved(false);
  };

  if (!fontsLoaded) {
    return null; // return null if fonts aren't loaded
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.closeIcon}>
          <Ionicons
            name="close"
            color={Colors.textLightDarkGray}
            size={28}
            onPress={() => setModalVisible(false)}
          />
        </View>
        <View style={styles.titleWrapper}>
          <TitleText text="Create Category" />
        </View>
        <Text style={styles.titleText}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={textInputHandler}
          value={typedText}
          placeholder="Enter a category title"
          placeholderTextColor={Colors.placeHolderTextGray}
          keyboardType="default"
        />
        <View style={styles.buttonContainer}>
          <WideButton
            title="Save"
            color="white"
            size={24}
            display={!isValidInput()} // Disable if input is invalid
            onPress={saveCategoryQuestionsHandler}
          />
        </View>
      </View>
    </View>
  );
};

export default CreateCategoryModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 20,
  },
  innerContainer: {
    justifyContent: "center",
  },
  closeIcon: {
    alignItems: "flex-end",
  },
  titleWrapper: {
    marginBottom: 18,
  },
  titleText: {
    fontSize: 18,
    fontFamily: "MavenPro-Bold",
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: Colors.textLightDarkGray,
    width: 340,
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 22,
  },
});

import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import TitleText from "../common/TitleText";
import WideButton from "../common/WideButton";
import { Ionicons } from "@expo/vector-icons";
// import { saveInterviewQuestions } from "../services/api";

const CreateCategoryModal = ({
  setModalVisible,
  setIsSaved,
  selectedCategoryQuestions,
  setSelectedCategoryQuestions,
  categories,
  setCategories,
  saveInterviewQuestions,
}) => {
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

    console.log("TEST SUCCESS LOG 1 ==> " + success);

    console.log("TEST SUCCESS LOG 2 ==> ", {
      categoryName: typedText,
      questions: questionsArray,
    });

    if (success) {
      // If successful, update local categories state
      setCategories((prevCategories) => [
        ...prevCategories,
        {
          categoryName: typedText,
          questions: questionsArray,
        },
      ]);
      console.log("Category saved successfully! ===> " + categories);
    } else {
      console.error("Failed to save category.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.closeIcon}>
          <Ionicons
            name="close"
            color="black"
            size={28}
            onPress={() => setModalVisible(false)}
          />
        </View>
        <View style={styles.titleWrapper}>
          <TitleText text="Create Category" />
        </View>
        <Text style={styles.upperText}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={textInputHandler}
          value={typedText}
          placeholder="Enter a category title."
          placeholderTextColor="gray"
          keyboardType="default"
        />
        {/* validation (in progress) */}
        {/* {(!typedText.trim()) && (
          <Text style={styles.lowerText}>* Input a category title.</Text>
        )} */}
        <View style={styles.buttonContainer}>
          <WideButton
            title="Save"
            color="white"
            size={24}
            display={!isValidInput()} // Disable if input is invalid
            onPress={saveCategoryQuestionsHandler}
            // onPress={() => {
            //   if (typedText.trim()) {
            //     setIsSaved(true);
            // setCategories((prevCategories) => [
            //   ...prevCategories,
            //   {
            //     categoryName: typedText,
            //     // replace with the real data
            //     questions: [
            //       // { question: "I'm a Test Question. Does it bother you?" },
            //       selectedCategoryQuestions,
            //     ],
            //   },
            // ]);
            //   }
            //   console.log("Current all categories ==> " + categories);
            // }}
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
    backgroundColor: "#fff",
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
  upperText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  textInput: {
    borderWidth: 2,
    borderRadius: 6,
    width: 340,
    height: 50,
    marginTop: 6,
    marginBottom: 2,
    padding: 10,
    fontSize: 18,
  },
  lowerText: {
    fontSize: 18,
    color: "red",
  },
  buttonContainer: {
    marginVertical: 16,
    marginTop: 24,
  },
});

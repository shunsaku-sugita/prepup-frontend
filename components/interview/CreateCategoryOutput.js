import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import TitleText from "../common/TitleText";
import WideButton from "../common/WideButton";
import BackToCategories from "../common/BackToCategories";
import { Ionicons } from "@expo/vector-icons";

const CreateCategoryOutput = ({ setModalVisible, setIsSaved, setItem }) => {
  const [typedText, setTypedText] = useState("");
  const textInputHandler = (enteredText) => {
    setTypedText(enteredText);
  };

  // onPress function

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
          placeholder="Enter a new category title."
          placeholderTextColor="gray"
          keyboardType="default"
        />
        {/* validation (in progress) */}
        {/* {(!typedText.trim()) && (
          <Text style={styles.lowerText}>* Input a category title.</Text>
        )} */}
        <View style={styles.button}>
          <WideButton
            title="Save"
            color="white"
            size={24}
            onPress={() => {
              if (typedText.trim()) {
                setIsSaved(true);
                setItem((prevItem) => ({
                  ...prevItem,
                  categories: [...prevItem.categories, typedText],
                }));
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default CreateCategoryOutput;

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
  button: {
    marginVertical: 16,
    marginTop: 24,
  },
});

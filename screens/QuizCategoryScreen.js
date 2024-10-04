import { StyleSheet, Text, View } from "react-native";
import React from "react";
import QuizCategoryOutput from "../components/flashcard/QuizCategoryOutput";

const QuizCategoryScreen = () => {
  return (
    <View style={styles.container}>
      <QuizCategoryOutput />
    </View>
  );
};

export default QuizCategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 18,
  },
  text: {
    fontSize: 24,
  },
});

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import QuizStarterOutput from "../components/flashcard/QuizStarterOutput";

const QuizStarterScreen = () => {
  return (
    <View style={styles.container}>
      <QuizStarterOutput />
    </View>
  );
};

export default QuizStarterScreen;

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

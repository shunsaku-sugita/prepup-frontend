import { StyleSheet, Text, View } from "react-native";
import React from "react";

const QuizFeedbackTitle = () => {
  return (
    <View>
      <Text style={styles.title}>Keep it up!</Text>
    </View>
  );
};

export default QuizFeedbackTitle;

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginVertical: 8,
  },
});

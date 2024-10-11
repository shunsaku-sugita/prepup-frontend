import { StyleSheet, Text, View } from "react-native";
import React from "react";

const QuizFeedbackText = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Congratulation! You are getting better on this specific knowledge. We
        hope you keep practicing on the way until you get a new job. See you
        next time!
      </Text>
    </View>
  );
};

export default QuizFeedbackText;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});

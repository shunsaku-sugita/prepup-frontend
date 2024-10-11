import { StyleSheet, Text, View } from "react-native";
import React from "react";

const QuizFeedbackAnswerDescription = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>The question(s) you missed:</Text>
      <Text style={styles.text}>
        <Text style={styles.textUnderline}>Question 3</Text>: While answering
        the interviewer, you as the interviewee should make an ____.
      </Text>
      <Text style={styles.text}>{` \u2022  `}Answer: B. eyes contact.</Text>
    </View>
  );
};

export default QuizFeedbackAnswerDescription;

const styles = StyleSheet.create({
  container: {
    width: "94%",
  },
  text: {
    fontSize: 16,
  },
  textUnderline: {
    textDecorationLine: "underline",
  },
});

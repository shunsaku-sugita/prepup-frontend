import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { AppContext } from "../../store/app-context";

const QuizQuestion = () => {
  const { item, setItem } = useContext(AppContext);
  const quizQuestionText = item.quizQuestionText[item.currentQuestionIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Question:</Text>
      <Text style={styles.text}>{quizQuestionText}</Text>
    </View>
  );
};

export default QuizQuestion;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    rowGap: 4,
  },
  titleText: {
    fontSize: 20,
    // fontWeight: "bold",
  },
  text: {
    fontSize: 20,
  },
});

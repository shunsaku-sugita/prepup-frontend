import { StyleSheet, Text, View } from "react-native";
import ProgressBar from "../common/ProgressBar";
import QuizAnswerOptions from "./QuizAnswerOptions";
import QuizQuestion from "./QuizQuestion";

import { AppContext } from "../../store/app-context";
import React, { useContext } from "react";

const QuizContentsOutput = () => {
  const { item } = useContext(AppContext);

  const {
    currentQuestionIndex,
    quizAnswerOptions,
    quizQuestionOptions,
    correctAnswerIndex,
  } = item;

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <QuizQuestion
          currentQuestionIndex={currentQuestionIndex}
          quizQuestionOptions={quizQuestionOptions}
        />
        <QuizAnswerOptions
          currentQuestionIndex={currentQuestionIndex}
          quizQuestionOptions={quizQuestionOptions}
          quizAnswerOptions={quizAnswerOptions}
          correctAnswerIndex={correctAnswerIndex}
        />
      </View>
    </View>
  );
};

export default QuizContentsOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginBottom: 32,
  },
  innerContainer: {
    flex: 6.5,
    rowGap: 17,
    width: "100%",
  },
  cardContainer: {
    // flex: 1,
    // padding: 12,
    // width: "80%",
    // height: "50%",
    // padding: 16,
    // borderRadius: 10,
    // borderWidth: 2,
    // borderColor: "#e0e0e0",
    // backgroundColor: "#fff",
    // width: "85%",
    // justifyContent: "center",
    // alignItems: "center",
  },
});

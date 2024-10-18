import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { AppContext } from "../../store/app-context";

const QuizQuestion = () => {
  const { item, setItem } = useContext(AppContext);
  // const quizQuestionText = item.quizQuestionOptions[item.currentQuestionIndex];
  const { currentQuestionIndex, quizQuestionOptions } = item;

  // const quizQuestionText = quizQuestionOptions[currentQuestionIndex];
  // const answerOptions = quizAnswerOptions[currentQuestionIndex];

  // // Function to handle answer selection
  // const handleAnswerSelect = (selectedAnswerIndex) => {
  //   // Check if there are more questions left
  //   if (currentQuestionIndex < quizQuestionOptions.length - 1) {
  //     // Move to the next question
  //     setItem({
  //       ...item,
  //       currentQuestionIndex: currentQuestionIndex + 1,
  //     });
  //   } else {
  //     setItem({
  //       ...item,
  //       currentQuestionIndex:
  //         currentQuestionIndex - (quizQuestionOptions.length - 1),
  //     });
  //     // Reset or show completion message if needed
  //     alert("You have completed the quiz!");
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Question:</Text>
      <Text style={styles.text}>
        {currentQuestionIndex + 1}.{quizQuestionOptions[currentQuestionIndex]}
      </Text>

      {/* {answerOptions.map((answer, index) => (
        <TouchableOpacity
          key={index}
          style={styles.answerButton}
          onPress={() => handleAnswerSelect(index)}
        >
          <Text>{answer}</Text>
        </TouchableOpacity>
      ))} */}
    </View>
  );
};

export default QuizQuestion;

const styles = StyleSheet.create({
  container: {
    rowGap: 10,
  },
  titleText: {
    fontSize: 20,
  },
  text: {
    fontSize: 20,
  },
  answerButton: {
    padding: 10,
    backgroundColor: "#ddd",
    marginVertical: 5,
  },
});

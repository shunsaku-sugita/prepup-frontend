import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import QuizModalTitle from "./QuizModalTitle";
import QuizModalText from "./QuizModalText";
import QuizModalAnswerDescription from "./QuizModalAnswerDescription";

const QuizModalFailedOutput = ({
  setModalVisible,
  setIsSelected,
  setSelectedAnswerIndex,
  currentQuestionIndex,
  quizQuestionOptions,
  onNextQuestion,
}) => {
  const navigation = useNavigation();

  const handleNext = () => {
    if (currentQuestionIndex === quizQuestionOptions.length - 1) {
      // If it's last question, navigate to the feedback screen
      navigation.navigate("QuizFeedback");
    } else {
      // Otherwise, proceed to the next question
      // onNextQuestion(); // Call the function to move to the next question
    }
    setModalVisible(false);
    setIsSelected(false);
    setSelectedAnswerIndex(null);
  };

  return (
    <View style={styles.container}>
      <Ionicons name="close-circle-outline" color="black" size={100} />
      <QuizModalTitle title="Try again!" />
      <QuizModalText text="Your correct answer is:" />
      <QuizModalAnswerDescription />
      <TouchableOpacity style={styles.buttonContainer} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuizModalFailedOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 15,
    marginBottom: 40,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 4,
    marginHorizontal: 8,
    width: 160,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
});

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const QuizAnswer = ({
  quizAnswerOption,
  quizAnswerText,
  isSelected,
  onPress,
}) => {
  // const pressHandler = () => {
  // setIsSelected(!isSelected);
  // onPress();
  // };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{quizAnswerOption}</Text>
        <Text style={styles.text}>{quizAnswerText}</Text>
      </View>
      <View style={styles.iconContainer}>
        {isSelected && (
          <Ionicons name="checkmark-circle" color="black" size={24} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default QuizAnswer;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    columnGap: 4,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
    minHeight: 40,
  },
  textContainer: {
    flexDirection: "row",
    columnGap: 2,
  },
  text: {
    fontSize: 16,
  },
  iconContainer: {},
});

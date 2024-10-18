import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";

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
      <View style={[styles.innerContainer, isSelected && styles.selected]}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{quizAnswerOption}</Text>
          <Text style={styles.text}>{quizAnswerText}</Text>
        </View>
        <View style={styles.iconContainer}>
          {isSelected && (
            <Ionicons name="checkmark-circle" color="black" size={24} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default QuizAnswer;

const styles = StyleSheet.create({
  container: {
    // flex: 0.1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    columnGap: 4,
    backgroundColor: "#c8c9c9",
    borderWidth: 2,
    borderColor: "#eee",
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
    minHeight: 40,
    width: "80%",
  },
  innerContainer: {},
  textContainer: {
    flexDirection: "row",
    columnGap: 2,
  },
  text: {
    fontSize: 16,
  },
  iconContainer: {},
  // swipeAction: {
  //   backgroundColor: "green",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   width: 80,
  //   height: "100%",
  // },
  selected: {
    backgroundColor: "#d3f9d8", // Highlight selected answer
  },
});

import { StyleSheet, Text, View } from "react-native";
import React from "react";

const QuizFeedbackRating = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>2/3</Text>
    </View>
  );
};

export default QuizFeedbackRating;

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: "#c9c9c9",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  },
});

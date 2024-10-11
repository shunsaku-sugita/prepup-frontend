import { StyleSheet, Text, View } from "react-native";
import React from "react";

const QuizModalAnswerDescription = () => {
  return (
    <View>
      <Text style={styles.text}>A. Upright and staring at people.</Text>
    </View>
  );
};

export default QuizModalAnswerDescription;

const styles = StyleSheet.create({
  text: {
    textDecorationLine: "underline",
  },
});

import { StyleSheet, Text, View } from "react-native";
import React from "react";

const QuizModalText = ({ text }) => {
  return (
    <View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default QuizModalText;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});

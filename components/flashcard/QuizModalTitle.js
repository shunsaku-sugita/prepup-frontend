import { StyleSheet, Text, View } from "react-native";
import React from "react";

const QuizModalTitle = ({ title }) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default QuizModalTitle;

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginVertical: 8,
  },
});

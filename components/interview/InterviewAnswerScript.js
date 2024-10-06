import { StyleSheet, Text, View, Button } from "react-native";
import React, { useEffect, useState } from "react";

const InterviewAnswerScript = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>InterviewAnswerScript</Text>
      </View>
    </View>
  );
};

export default InterviewAnswerScript;

const styles = StyleSheet.create({
  container: {
    flex: 4,
    borderWidth: 1,
    borderRadius: 12,
    width: "90%",
    // marginBottom: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
  },
});

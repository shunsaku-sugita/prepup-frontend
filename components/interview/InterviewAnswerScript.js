import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

const InterviewAnswerScript = ({ transcription }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <ScrollView>
          <Text style={styles.text}>{transcription}</Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default InterviewAnswerScript;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#eee",
    backgroundColor: "#eee",
    marginBottom: 25,
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-start",
    width: 330,
    padding: 12,
  },
  text: {
    fontSize: 16,
  },
});

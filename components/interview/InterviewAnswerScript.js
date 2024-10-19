import { StyleSheet, Text, View, Button } from "react-native";
import React, { useEffect, useState } from "react";

const InterviewAnswerScript = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas odio
          ligula, consequat eget convallis quis, varius sodales ipsum. Sed
          congue nulla eu dictum dapibus. Vivamus nec pellentesque ipsum. Donec
          et hendrerit ex. Cras lobortis, est sit amet commodo gravida, felis
          nisi commodo nunc, sit amet viverra justo lorem a enim.
        </Text>
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
    width: 310,
    padding: 12,
  },
  text: {
    fontSize: 16,
  },
});

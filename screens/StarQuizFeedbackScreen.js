import { StyleSheet, Text, View } from "react-native";
import React from "react";
import StarQuizFeedbackOutput from "../components/starquiz/StarQuizFeedbackOutput";

const StarMasterFeedbackScreen = () => {
  return (
    <View style={styles.container}>
      <StarQuizFeedbackOutput />
    </View>
  );
};

export default StarMasterFeedbackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

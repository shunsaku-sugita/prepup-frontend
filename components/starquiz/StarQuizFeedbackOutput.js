import { StyleSheet, Text, View } from "react-native";
import React from "react";
import StarQuizFeedbackIconRatings from "./StarQuizFeedbackIconRatings";
import StarQuizFeedbackAccordions from "./StarQuizFeedbackAccordions";
import WideButton from "../common/WideButton";
import { useNavigation } from "expo-router";

const StarQuizFeedbackOutput = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StarQuizFeedbackIconRatings />
      <StarQuizFeedbackAccordions />
      <View style={styles.retryButton}>
        <WideButton
          title="Try again"
          color="white"
          onPress={() => navigation.navigate("StarQuiz")}
        />
      </View>
    </View>
  );
};

export default StarQuizFeedbackOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 40,
    width: "100%",
  },
  retryButton: {
    flex: 0.9,
  },
});

import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import StarQuizFeedbackIconRatings from "./StarQuizFeedbackIconRatings";
import StarQuizFeedbackAccordions from "./StarQuizFeedbackAccordions";
import WideButton from "../common/WideButton";
import { useNavigation } from "expo-router";
import { AppContext } from "@/store/app-context";

const StarQuizFeedbackOutput = ({ starMasterFeedback }) => {
  const { setAnswers } = useContext(AppContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StarQuizFeedbackIconRatings starMasterFeedback={starMasterFeedback} />
      <StarQuizFeedbackAccordions starMasterFeedback={starMasterFeedback} />
      <View style={styles.retryButton}>
        <WideButton
          title="Try again"
          color="white"
          onPress={() => {
            setAnswers((prevAnswers) => ({
              ...prevAnswers,
              situation: "",
              task: "",
              action: "",
              result: "",
            }));
            navigation.navigate("StarQuiz");
          }}
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

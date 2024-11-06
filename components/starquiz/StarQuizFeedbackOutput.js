import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import StarQuizFeedbackIconRatings from "./StarQuizFeedbackIconRatings";
import StarQuizFeedbackAccordions from "./StarQuizFeedbackAccordions";
import WideButton from "../common/WideButton";
import { useNavigation } from "expo-router";
import { AppContext } from "@/store/app-context";
import { Colors } from "@/constants/Colors";

const StarQuizFeedbackOutput = ({ starMasterFeedback }) => {
  const {
    setAnswers,
    loading,
    situationInputRef,
    taskInputRef,
    actionInputRef,
    resultInputRef,
  } = useContext(AppContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StarQuizFeedbackIconRatings starMasterFeedback={starMasterFeedback} />
      <StarQuizFeedbackAccordions starMasterFeedback={starMasterFeedback} />
      <View style={styles.retryButton}>
        <WideButton
          title="Practice Again"
          color="white"
          onPress={() => {
            setAnswers((prevAnswers) => ({
              ...prevAnswers,
              situation: "",
              task: "",
              action: "",
              result: "",
            }));
            situationInputRef.current?.blur();
            taskInputRef.current?.blur();
            actionInputRef.current?.blur();
            resultInputRef.current?.blur();
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
    backgroundColor: Colors.defaultBeige,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 40,
    width: "100%",
  },
  retryButton: {
    flex: 0.9,
  },
});

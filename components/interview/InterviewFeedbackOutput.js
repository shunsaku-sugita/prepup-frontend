import { ScrollView, StyleSheet, View } from "react-native";
import InterviewFeedbackBadge from "./InterviewFeedbackBadge";
import InterviewFeedbackButtons from "./InterviewFeedbackButtons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import InterviewFeedbackAccordions from "./InterviewFeedbackAccordions";
import { AppContext } from "@/store/app-context";
import { useContext } from "react";

const InterviewFeedbackOutput = () => {
  const { item } = useContext(AppContext);
  const { currentQuestionIndex } = item;

  return (
    <GestureHandlerRootView style={styles.container}>
      <InterviewFeedbackBadge />
      <InterviewFeedbackAccordions />
      <InterviewFeedbackButtons currentQuestionIndex={currentQuestionIndex} />
    </GestureHandlerRootView>
  );
};

export default InterviewFeedbackOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
});

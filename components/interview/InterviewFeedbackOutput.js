import { ScrollView, StyleSheet, View } from "react-native";
import InterviewFeedbackBadge from "./InterviewFeedbackBadge";
import InterviewFeedbackButtons from "./InterviewFeedbackButtons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import InterviewFeedbackRatings from "./InterviewFeedbackRatings";
import { AppContext } from "@/store/app-context";
import { useContext } from "react";

const InterviewFeedbackOutput = () => {
  const { item } = useContext(AppContext);
  const { currentQuestionIndex } = item;

  return (
    <ScrollView style={styles.screen}>
      <GestureHandlerRootView style={styles.container}>
        <InterviewFeedbackBadge />
        <InterviewFeedbackRatings />
        <InterviewFeedbackButtons currentQuestionIndex={currentQuestionIndex} />
      </GestureHandlerRootView>
    </ScrollView>
  );
};

export default InterviewFeedbackOutput;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

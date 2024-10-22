import { ScrollView, StyleSheet, View } from "react-native";
import InterviewFeedbackBadge from "./InterviewFeedbackBadge";
import InterviewFeedbackButtons from "./InterviewFeedbackButtons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import InterviewFeedbackAccordions from "./InterviewFeedbackAccordions";
import { AppContext } from "@/store/app-context";
import { useContext } from "react";

const InterviewFeedbackOutput = () => {
  const {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    selectedCategoryQuestions,
    setSelectedCategoryQuestions,
    setQuestionAnswerArray,
    categories,
    setCategories,
  } = useContext(AppContext);

  return (
    <GestureHandlerRootView style={styles.container}>
      <InterviewFeedbackBadge />
      <InterviewFeedbackAccordions />
      <InterviewFeedbackButtons
        currentQuestionIndex={currentQuestionIndex}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
        selectedCategoryQuestions={selectedCategoryQuestions}
        setSelectedCategoryQuestions={setSelectedCategoryQuestions}
        setQuestionAnswerArray={setQuestionAnswerArray}
        categories={categories}
        setCategories={setCategories}
      />
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

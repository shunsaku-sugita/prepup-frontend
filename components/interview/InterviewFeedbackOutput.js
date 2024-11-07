import { ScrollView, StyleSheet, View } from "react-native";
import InterviewFeedbackBadge from "./InterviewFeedbackBadge";
import InterviewFeedbackButtons from "./InterviewFeedbackButtons";
import InterviewFeedbackAccordions from "./InterviewFeedbackAccordions";
import { AppContext } from "@/store/app-context";
import { useContext, useEffect } from "react";
import { Colors } from "@/constants/Colors";
import LoadingOverlay from "../common/LoadingOverlay";

const InterviewFeedbackOutput = ({ analyzedAnswer }) => {
  const {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    selectedCategoryQuestions,
    setSelectedCategoryQuestions,
    setQuestionAnswerArray,
    progressUpdate,
    categories,
    setCategories,
  } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <InterviewFeedbackBadge analyzedAnswer={analyzedAnswer} />
      <InterviewFeedbackAccordions analyzedAnswer={analyzedAnswer} />
      <InterviewFeedbackButtons
        currentQuestionIndex={currentQuestionIndex}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
        selectedCategoryQuestions={selectedCategoryQuestions}
        setSelectedCategoryQuestions={setSelectedCategoryQuestions}
        setQuestionAnswerArray={setQuestionAnswerArray}
        categories={categories}
        setCategories={setCategories}
        progressUpdate={progressUpdate}
      />
    </View>
  );
};

export default InterviewFeedbackOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.disabledBeige,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
});

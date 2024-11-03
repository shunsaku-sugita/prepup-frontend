import { ScrollView, StyleSheet, View } from "react-native";
import InterviewFeedbackBadge from "./InterviewFeedbackBadge";
import InterviewFeedbackButtons from "./InterviewFeedbackButtons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import InterviewFeedbackAccordions from "./InterviewFeedbackAccordions";
import { AppContext } from "@/store/app-context";
import { useContext, useEffect } from "react";
import { Colors } from "@/constants/Colors";
import LoadingOverlay from "../common/LoadingOverlay";

const InterviewFeedbackOutput = () => {
  const {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    selectedCategoryQuestions,
    setSelectedCategoryQuestions,
    setQuestionAnswerArray,
    progressUpdate,
    categories,
    setCategories,
    analyzedAnswer,
    loading
  } = useContext(AppContext);

  // useEffect(() => {
  //   console.log("=== progressUpdate ===");
  //   console.log(progressUpdate.status);
  // }, [])
  

  return (
    <GestureHandlerRootView style={styles.container}>
      { loading ? (
        <LoadingOverlay />
      ) : (
        <>
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
        </>
      )
    }
    </GestureHandlerRootView>
  );
};

export default InterviewFeedbackOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultBeige,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
});

import { StyleSheet, Text, View } from "react-native";
import InterviewControllerIcons from "./InterviewControllerIcons";
import HearableQuestions from "../common/HearableQuestions";
import ProgressBar from "../common/ProgressBar";
import { AppContext } from "@/store/app-context";
import { useContext } from "react";
import { Colors } from "@/constants/Colors";

const InterviewContentsOutput = () => {
  const {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    selectedCategoryQuestions,
    questionAnswerArray,
    setQuestionAnswerArray,
    analyzedAnswer,
    setAnalyzedAnswer,
  } = useContext(AppContext);

  const questionText = selectedCategoryQuestions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <ProgressBar
        currentIndexNum={currentQuestionIndex}
        totalNum={selectedCategoryQuestions.length}
      />
      <View style={styles.questions}>
        <HearableQuestions questionText={questionText} />
      </View>
      <View style={styles.innerContainer}>
        <InterviewControllerIcons
          currentQuestionIndex={currentQuestionIndex}
          interviewQuestions={selectedCategoryQuestions}
          questionText={questionText}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          questionAnswerArray={questionAnswerArray}
          setQuestionAnswerArray={setQuestionAnswerArray}
          analyzedAnswer={analyzedAnswer}
          setAnalyzedAnswer={setAnalyzedAnswer}
        />
      </View>
    </View>
  );
};

export default InterviewContentsOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultBeige,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 40,
    width: "100%",
  },
  questions: {
    flex: 2,
  },
  innerContainer: {
    flex: 8,
    width: "85%",
    alignItems: "center",
  },
});

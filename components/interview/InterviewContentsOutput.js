import { StyleSheet, Text, View } from "react-native";
import InterviewAnswerScript from "./InterviewAnswerScript";
import InterviewControllerIcons from "./InterviewControllerIcons";
import HearableQuestions from "../common/HearableQuestions";
import ProgressBar from "../common/ProgressBar";
import { AppContext } from "@/store/app-context";
import { useContext } from "react";

const InterviewContentsOutput = () => {
  const { item, setItem } = useContext(AppContext);

  const { currentQuestionIndex, interviewQuestions } = item;
  let questionText = interviewQuestions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <ProgressBar
        currentIndexNum={currentQuestionIndex}
        totalNum={interviewQuestions.length}
      />
      <View style={styles.innerContainer}>
        <HearableQuestions questionText={questionText} />
        <InterviewControllerIcons
          currentQuestionIndex={currentQuestionIndex}
          interviewQuestions={interviewQuestions}
          setItem={setItem}
        />
      </View>
    </View>
  );
};

export default InterviewContentsOutput;

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
  innerContainer: {
    flex: 6.5,
    width: "85%",
    alignItems: "center",
  },
});

import { StyleSheet, Text, View } from "react-native";
import ProgressBar from "../common/ProgressBar";
import QuizAnswerOptions from "./QuizAnswerOptions";
import QuizQuestion from "./QuizQuestion";

const QuizContentsOutput = () => {
  return (
    <View style={styles.container}>
      <ProgressBar number="3" />
      <View style={styles.innerContainer}>
        <QuizQuestion />
        <QuizAnswerOptions />
      </View>
    </View>
  );
};

export default QuizContentsOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 130,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 50,
    width: "100%",
  },
  innerContainer: {
    flex: 6.5,
    rowGap: 17,
    width: "85%",
  },
});

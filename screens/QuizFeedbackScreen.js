import { StyleSheet, Text, View } from "react-native";
import QuizFeedbackOutput from "../components/flashcard/QuizFeedbackOutput";

const QuizFeedbackScreen = () => {
  return (
    <View style={styles.container}>
      <QuizFeedbackOutput />
    </View>
  );
};

export default QuizFeedbackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
  },
});

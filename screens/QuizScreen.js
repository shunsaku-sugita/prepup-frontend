import { StyleSheet, Text, View } from "react-native";
import QuizContentsOutput from "../components/flashcard/QuizContentsOutput";

const QuizScreen = () => {
  return (
    <View style={styles.container}>
      <QuizContentsOutput />
    </View>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

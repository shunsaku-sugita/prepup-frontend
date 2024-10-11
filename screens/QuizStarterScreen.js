import { StyleSheet, Text, View } from "react-native";
import QuizStarterOutput from "../components/flashcard/QuizStarterOutput";

const QuizStarterScreen = () => {
  return (
    <View style={styles.container}>
      <QuizStarterOutput />
    </View>
  );
};

export default QuizStarterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

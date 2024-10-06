import { View, StyleSheet } from "react-native";
import InterviewFeedbackOutput from "../components/interview/InterviewFeedbackOutput";

const InterviewFeedbackScreen = () => {
  return (
    <View style={styles.container}>
      <InterviewFeedbackOutput />
    </View>
  );
};

export default InterviewFeedbackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

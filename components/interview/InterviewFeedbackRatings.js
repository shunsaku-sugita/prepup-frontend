import { StyleSheet, Text, View } from "react-native";
import InterviewFeedbackCard from "./InterviewFeedbackCard";

const InterviewFeedbackRatings = () => {
  return (
    <View style={styles.container}>
      <InterviewFeedbackCard />
      <InterviewFeedbackCard />
      <InterviewFeedbackCard />
      <InterviewFeedbackCard />
    </View>
  );
};

export default InterviewFeedbackRatings;

const styles = StyleSheet.create({
  container: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 10,
    marginVertical: 10,
  },
  text: {
    fontSize: 24,
  },
});

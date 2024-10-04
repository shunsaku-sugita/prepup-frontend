import { View, Text, StyleSheet } from "react-native";

const InterviewFeedbackScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>InterviewFeedback</Text>
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
  text: {
    fontSize: 24,
  },
});

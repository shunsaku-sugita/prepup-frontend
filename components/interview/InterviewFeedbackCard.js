import { StyleSheet, Text, View } from "react-native";

const InterviewFeedbackCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>InterviewFeedbackCard</Text>
    </View>
  );
};

export default InterviewFeedbackCard;

const styles = StyleSheet.create({
  container: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
  },
});

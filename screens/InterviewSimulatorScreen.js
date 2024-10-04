import { View, StyleSheet } from "react-native";
import InterviewContentsOutput from "../components/interview/InterviewContentsOutput";

const InterviewSimulatorScreen = () => {
  return (
    <View style={styles.container}>
      <InterviewContentsOutput />
    </View>
  );
};

export default InterviewSimulatorScreen;

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
  buttonContainer: {
    backgroundColor: "#eee",
    color: "white",
    padding: 8,
    borderWidth: 2,
    borderRadius: 8,
    margin: 8,
  },
});

import { StyleSheet, Text, View } from "react-native";
import InterviewAnswerScript from "./InterviewAnswerScript";
import InterviewControllerIcons from "./InterviewControllerIcons";
import InterviewQuestion from "./InterviewQuestion";
import ProgressBar from "../common/ProgressBar";

const InterviewContentsOutput = () => {
  return (
    <View style={styles.container}>
      <ProgressBar />
      <InterviewQuestion />
      <InterviewAnswerScript />
      <InterviewControllerIcons />
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
    marginBottom: 30,
  },
});

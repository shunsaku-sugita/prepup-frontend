import { StyleSheet, Text, View } from "react-native";
import InterviewAnswerScript from "./InterviewAnswerScript";
import InterviewControllerIcons from "./InterviewControllerIcons";
import InterviewQuestion from "./InterviewQuestion";
import ProgressBar from "../common/ProgressBar";

const InterviewContentsOutput = () => {
  return (
    <View style={styles.container}>
      <ProgressBar number="5" />
      <View style={styles.innerContainer}>
        <InterviewQuestion />
        <InterviewAnswerScript />
        <InterviewControllerIcons />
      </View>
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
    marginBottom: 40,
    width: "100%",
  },
  innerContainer: {
    flex: 6.5,
    width: "85%",
    alignItems: "center",
  },
});

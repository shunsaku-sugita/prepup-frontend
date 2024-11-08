import LoadingOverlay from "@/components/common/LoadingOverlay";
import { Colors } from "@/constants/Colors";
import { AppContext } from "@/store/app-context";
import { useContext } from "react";
import { View, StyleSheet } from "react-native";
import InterviewFeedbackOutput from "../components/interview/InterviewFeedbackOutput";

const InterviewFeedbackScreen = () => {
  const { loading, analyzedAnswer } = useContext(AppContext);
  return (
    <View style={styles.container}>
      {loading ? (
        <LoadingOverlay />
      ) : (
        <InterviewFeedbackOutput analyzedAnswer={analyzedAnswer} />
      )}
    </View>
  );
};

export default InterviewFeedbackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.disabledBeige,
    alignItems: "center",
    justifyContent: "center",
  },
});

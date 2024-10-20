import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TitleText from "../common/TitleText";

const InterviewFeedbackBadge = () => {
  return (
    <View style={styles.container}>
      <TitleText text="Congraturations!" />
      <Ionicons name="trophy-outline" color="black" size={140} />
    </View>
  );
};

export default InterviewFeedbackBadge;

const styles = StyleSheet.create({
  container: {
    flex: 1.5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
});

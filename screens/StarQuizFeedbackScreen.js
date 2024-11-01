import { StyleSheet, Text, View } from "react-native";
import React from "react";
import StarQuizFeedbackOutput from "../components/starquiz/StarQuizFeedbackOutput";
import LoadingOverlay from "@/components/common/LoadingOverlay";
import { Colors } from "@/constants/Colors";

const StarMasterFeedbackScreen = ({ route }) => {
  // extract the feedback from route parameters
  const { starMasterFeedback } = route.params;

  return (
    <View style={styles.container}>
      {starMasterFeedback ? (
        <StarQuizFeedbackOutput starMasterFeedback={starMasterFeedback} />
      ) : (
        <LoadingOverlay />
      )}
    </View>
  );
};

export default StarMasterFeedbackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultBeige,
    alignItems: "center",
    justifyContent: "center",
  },
});

import { StyleSheet, View } from "react-native";
import React from "react";
import StarMasterFeedbackOutput from "../components/starmaster/StarMasterFeedbackOutput";
import LoadingOverlay from "@/components/common/LoadingOverlay";
import { Colors } from "@/constants/Colors";

const StarMasterFeedbackScreen = ({ route }) => {
  // extract the feedback from route parameters
  const { starMasterFeedback } = route.params;

  return (
    <View style={styles.container}>
      {starMasterFeedback ? (
        <StarMasterFeedbackOutput starMasterFeedback={starMasterFeedback} />
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
    backgroundColor: Colors.disabledBeige,
    alignItems: "center",
    justifyContent: "center",
  },
});

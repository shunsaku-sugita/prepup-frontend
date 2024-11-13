import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import StarMasterFeedbackIconRatings from "./StarMasterFeedbackIconRatings";
import StarMasterFeedbackAccordions from "./StarMasterFeedbackAccordions";
import WideButton from "../common/WideButton";
import { useNavigation } from "expo-router";
import { AppContext } from "@/store/app-context";
import { Colors } from "@/constants/Colors";

const StarMasterFeedbackOutput = ({ starMasterFeedback }) => {
  const { setAnswers } = useContext(AppContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StarMasterFeedbackIconRatings starMasterFeedback={starMasterFeedback} />
      <StarMasterFeedbackAccordions starMasterFeedback={starMasterFeedback} />
      <View style={styles.retryButton}>
        <WideButton
          title="Practice Again"
          color="white"
          onPress={() => {
            setAnswers((prevAnswers) => ({
              ...prevAnswers,
              situation: "",
              task: "",
              action: "",
              result: "",
            }));
            navigation.navigate("StarMaster");
          }}
        />
      </View>
    </View>
  );
};

export default StarMasterFeedbackOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.disabledBeige,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 40,
    width: "100%",
  },
  retryButton: {
    flex: 0.9,
  },
});

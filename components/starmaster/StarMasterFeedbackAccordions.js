import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Accordion } from "@/components/ui/accordion";
import StarMasterFeedbackCard from "./StarMasterFeedbackCard";
import { Colors } from "@/constants/Colors";

const StarMasterFeedbackAccordions = ({ starMasterFeedback }) => {
  const [situationFeedbackComment, setSituationFeedbackComment] = useState("");
  const [taskFeedbackComment, setTaskFeedbackComment] = useState("");
  const [actionFeedbackComment, setActionFeedbackComment] = useState("");
  const [resultFeedbackComment, setResultFeedbackComment] = useState("");

  useEffect(() => {
    // update feedback comments for S*T*A*R
    setSituationFeedbackComment(starMasterFeedback.feedback.situation);
    setTaskFeedbackComment(starMasterFeedback.feedback.task);
    setActionFeedbackComment(starMasterFeedback.feedback.action);
    setResultFeedbackComment(starMasterFeedback.feedback.result);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={true}>
        <Accordion style={styles.accordionContainer} type="multiple">
          <StarMasterFeedbackCard
            value="a"
            titleText="Situation"
            contentText={situationFeedbackComment}
            backgroundColorStyle={Colors.disabledYellow}
          />
          <StarMasterFeedbackCard
            value="b"
            titleText="Task"
            contentText={taskFeedbackComment}
            backgroundColorStyle={Colors.disabledRed}
          />
          <StarMasterFeedbackCard
            value="c"
            titleText="Action"
            contentText={actionFeedbackComment}
            backgroundColorStyle={Colors.disabledBlue}
          />
          <StarMasterFeedbackCard
            value="d"
            titleText="Result"
            contentText={resultFeedbackComment}
            backgroundColorStyle={Colors.defaultBeige}
          />
        </Accordion>
      </ScrollView>
    </View>
  );
};

export default StarMasterFeedbackAccordions;

const styles = StyleSheet.create({
  container: {
    flex: 6,
    marginBottom: 60,
  },
  accordionContainer: {
    width: 340,
    marginHorizontal: 10,
    rowGap: 11,
  },
});

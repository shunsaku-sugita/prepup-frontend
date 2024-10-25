import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Accordion } from "@/components/ui/accordion";
import StarQuizFeedbackCard from "./StarQuizFeedbackCard";

const StarQuizFeedbackAccordions = ({ starMasterFeedback }) => {
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
      <ScrollView>
        <Accordion style={styles.accordionContainer} type="multiple">
          <StarQuizFeedbackCard
            value="a"
            titleText="Situation"
            contentText={situationFeedbackComment}
          />
          <StarQuizFeedbackCard
            value="b"
            titleText="Task"
            contentText={taskFeedbackComment}
          />
          <StarQuizFeedbackCard
            value="c"
            titleText="Action"
            contentText={actionFeedbackComment}
          />
          <StarQuizFeedbackCard
            value="d"
            titleText="Result"
            contentText={resultFeedbackComment}
          />
        </Accordion>
      </ScrollView>
    </View>
  );
};

export default StarQuizFeedbackAccordions;

const styles = StyleSheet.create({
  container: {
    flex: 6,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 40,
  },
  accordionContainer: {
    width: 340,
    marginTop: 20,
    marginHorizontal: 10,
    rowGap: 15,
  },
});

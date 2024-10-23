import { ScrollView, StyleSheet, View } from "react-native";
import InterviewFeedbackCard from "./InterviewFeedbackCard";
import { Accordion } from "@/components/ui/accordion";

const InterviewFeedbackAccordions = ({ analyzedAnswer }) => {
  const fluencyScore = analyzedAnswer.scores.speaking;
  const confidenceScore = analyzedAnswer.scores.confidence;
  const clarityScore = analyzedAnswer.scores.clarity;
  const concisenessScore = analyzedAnswer.scores.conciseness;

  return (
    <View style={styles.container}>
      <ScrollView>
        <Accordion style={styles.accordionContainer} type="multiple">
          <InterviewFeedbackCard
            value="a"
            titleText="Fluency"
            percentage={fluencyScore}
            contentText="Yes, you can disable the whole accordion by setting the isDisabled prop to true on the Accordion component."
          />
          <InterviewFeedbackCard
            value="b"
            titleText="Confidence"
            percentage={confidenceScore}
            contentText="Yes, you can disable the whole accordion by setting the isDisabled prop to true on the Accordion component."
          />
          <InterviewFeedbackCard
            value="c"
            titleText="Clarity"
            percentage={clarityScore}
            contentText="Yes, you can disable the whole accordion by setting the isDisabled prop to true on the Accordion component."
          />
          <InterviewFeedbackCard
            value="d"
            titleText="Conciseness"
            percentage={concisenessScore}
            contentText="Yes, you can disable the whole accordion by setting the isDisabled prop to true on the Accordion component."
          />
        </Accordion>
      </ScrollView>
    </View>
  );
};

export default InterviewFeedbackAccordions;

const styles = StyleSheet.create({
  container: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  accordionContainer: {
    width: 340,
    marginTop: 20,
    marginHorizontal: 10,
    rowGap: 15,
  },
});

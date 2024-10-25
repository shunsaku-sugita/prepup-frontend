import { ScrollView, StyleSheet, View } from "react-native";
import InterviewFeedbackCard from "./InterviewFeedbackCard";
import { Accordion } from "@/components/ui/accordion";

const InterviewFeedbackAccordions = ({ analyzedAnswer }) => {
  const fluencyScore = analyzedAnswer.analysis.fluency.score;
  const confidenceScore = analyzedAnswer.analysis.confidence.score;
  const clarityScore = analyzedAnswer.analysis.clarity.score;
  const concisenessScore = analyzedAnswer.analysis.conciseness.score;

  const fluencyFeedbackComment = analyzedAnswer.analysis.fluency.feedback;
  const confidenceFeedbackComment = analyzedAnswer.analysis.confidence.feedback;
  const clarityFeedbackComment = analyzedAnswer.analysis.clarity.feedback;
  const concisenessFeedbackComment =
    analyzedAnswer.analysis.conciseness.feedback;

  return (
    <View style={styles.container}>
      <ScrollView>
        <Accordion style={styles.accordionContainer} type="multiple">
          <InterviewFeedbackCard
            value="a"
            titleText="Fluency"
            percentage={fluencyScore}
            contentText={fluencyFeedbackComment}
          />
          <InterviewFeedbackCard
            value="b"
            titleText="Confidence"
            percentage={confidenceScore}
            contentText={confidenceFeedbackComment}
          />
          <InterviewFeedbackCard
            value="c"
            titleText="Clarity"
            percentage={clarityScore}
            contentText={clarityFeedbackComment}
          />
          <InterviewFeedbackCard
            value="d"
            titleText="Conciseness"
            percentage={concisenessScore}
            contentText={concisenessFeedbackComment}
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

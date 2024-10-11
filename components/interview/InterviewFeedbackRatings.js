import { StyleSheet, View } from "react-native";
import InterviewFeedbackCard from "./InterviewFeedbackCard";
import { Accordion } from "@/components/ui/accordion";

const InterviewFeedbackRatings = () => {
  return (
    <View style={styles.container}>
      <Accordion style={styles.accordionContainer} type="multiple">
        <InterviewFeedbackCard
          value="a"
          titleText="Fluency"
          percentage="80"
          contentText="Yes, you can disable the whole accordion by setting the isDisabled prop to true on the Accordion component."
        />
        <InterviewFeedbackCard
          value="b"
          titleText="Confidence"
          percentage="90"
          contentText="Yes, you can disable the whole accordion by setting the isDisabled prop to true on the Accordion component."
        />
        <InterviewFeedbackCard
          value="c"
          titleText="Clarity"
          percentage="75"
          contentText="Yes, you can disable the whole accordion by setting the isDisabled prop to true on the Accordion component."
        />
        <InterviewFeedbackCard
          value="d"
          titleText="Professionalism"
          percentage="90"
          contentText="Yes, you can disable the whole accordion by setting the isDisabled prop to true on the Accordion component."
        />
      </Accordion>
    </View>
  );
};

export default InterviewFeedbackRatings;

const styles = StyleSheet.create({
  container: {
    flex: 6,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
    marginBottom: 30,
  },
  accordionContainer: {
    width: "100%",
    marginTop: 20,
    marginHorizontal: 10,
    rowGap: 15,
  },
});

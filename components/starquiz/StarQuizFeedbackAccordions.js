import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Accordion } from "@/components/ui/accordion";
import StarQuizFeedbackCard from "./StarQuizFeedbackCard";

const StarQuizFeedbackAccordions = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Accordion style={styles.accordionContainer} type="multiple">
          <StarQuizFeedbackCard
            value="a"
            titleText="Situation"
            // percentage="80"
            contentText="Yes, you can disable the whole accordion by setting the isDisabled prop to true on the Accordion component. Let me just make this example text a little bit longer than original like this."
          />
          <StarQuizFeedbackCard
            value="b"
            titleText="Task"
            // percentage="90"
            contentText="Yes, you can disable the whole accordion by setting the isDisabled prop to true on the Accordion component. Let me just make this example text a little bit longer than original like this."
          />
          <StarQuizFeedbackCard
            value="c"
            titleText="Action"
            // percentage="75"
            contentText="Yes, you can disable the whole accordion by setting the isDisabled prop to true on the Accordion component. Let me just make this example text a little bit longer than original like this."
          />
          <StarQuizFeedbackCard
            value="d"
            titleText="Result"
            // percentage="90"
            contentText="Yes, you can disable the whole accordion by setting the isDisabled prop to true on the Accordion component. Let me just make this example text a little bit longer than original like this."
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

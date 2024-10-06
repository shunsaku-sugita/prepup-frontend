import { StyleSheet, View } from "react-native";
import {
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTitleText,
  AccordionContent,
  AccordionContentText,
} from "@/components/ui/accordion";
import { Ionicons } from "@expo/vector-icons";

const InterviewFeedbackCard = ({
  value,
  titleText,
  percentage,
  contentText,
}) => {
  return (
    <AccordionItem value={value} style={styles.accordionItem}>
      <AccordionHeader>
        <AccordionTrigger style={styles.accordionTrigger}>
          {({ isExpanded }) => {
            return (
              <>
                <View style={styles.accordionHeaderLeftContainer}>
                  {isExpanded ? (
                    <Ionicons name="chevron-up" color="black" size="24" />
                  ) : (
                    <Ionicons name="chevron-down" color="black" size="24" />
                  )}
                  <AccordionTitleText style={styles.accordionTitleText}>
                    {titleText}
                  </AccordionTitleText>
                </View>
                <AccordionTitleText style={styles.accordionTitleText}>
                  {percentage}%
                </AccordionTitleText>
              </>
            );
          }}
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent style={styles.accordionContent}>
        <AccordionContentText style={styles.accordionContentText}>
          {contentText}
        </AccordionContentText>
      </AccordionContent>
    </AccordionItem>
  );
};

export default InterviewFeedbackCard;

const styles = StyleSheet.create({
  container: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  accordionItem: {
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 8,
    padding: 16,
  },
  accordionTrigger: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  accordionHeaderLeftContainer: {
    flexDirection: "row",
    columnGap: 8,
    alignItems: "center",
  },
  accordionTitleText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  accordionContent: {
    marginTop: 10,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#bbb",
  },
  accordionContentText: {
    fontSize: 15,
    lineHeight: 21,
  },
});

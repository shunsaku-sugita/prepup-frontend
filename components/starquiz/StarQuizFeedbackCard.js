import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTitleText,
  AccordionContent,
  AccordionContentText,
} from "@/components/ui/accordion";
import { Ionicons } from "@expo/vector-icons";

const StarQuizFeedbackCard = ({
  value,
  titleText,
  // percentage,
  contentText,
}) => {
  return (
    <AccordionItem value={value} style={styles.accordionItem}>
      <AccordionHeader>
        <AccordionTrigger style={styles.accordionTrigger}>
          {({ isExpanded }) => {
            return (
              <>
                <AccordionTitleText style={styles.accordionTitleText}>
                  {titleText}
                </AccordionTitleText>
                <View style={styles.accordionHeaderRightContainer}>
                  {/* <AccordionTitleText style={styles.accordionTitleText}> */}
                  {/* {percentage}% */}
                  {/* </AccordionTitleText> */}
                  {isExpanded ? (
                    <Ionicons name="chevron-up" color="black" size={22} />
                  ) : (
                    <Ionicons name="chevron-down" color="black" size={22} />
                  )}
                </View>
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

export default StarQuizFeedbackCard;

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
    backgroundColor: "#eee",
  },
  accordionTrigger: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  accordionHeaderRightContainer: {
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
    paddingTop: 3,
    // borderTopWidth: 1,
    // borderTopColor: "#bbb",
  },
  accordionContentText: {
    fontSize: 15,
    lineHeight: 21,
  },
});

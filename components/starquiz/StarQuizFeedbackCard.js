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

const StarQuizFeedbackCard = ({ value, titleText, contentText, backgroundColorStyle }) => {
  return (
    <AccordionItem value={value} style={[styles.accordionItem, {backgroundColor: backgroundColorStyle}]} >
      <AccordionHeader>
        <AccordionTrigger style={styles.accordionTrigger}>
          {({ isExpanded }) => {
            return (
              <>
                <AccordionTitleText style={styles.accordionTitleText}>
                  {titleText}
                </AccordionTitleText>
                <View style={styles.accordionHeaderRightContainer}>
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
    alignItems: "center",
    justifyContent: "center",
  },
  accordionItem: {
    borderRadius: 4,
    padding: 16,
  },
  // accordionItemBackgroundColor: {
  //   backgroundColor: backgroundColorStyle,
  // },
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
  },
  accordionContentText: {
    fontSize: 15.5,
    lineHeight: 21,
  },
});

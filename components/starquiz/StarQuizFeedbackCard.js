import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import {
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTitleText,
  AccordionContent,
  AccordionContentText,
} from "@/components/ui/accordion";
import { Ionicons } from "@expo/vector-icons";
import { AppContext } from "@/store/app-context";

const StarQuizFeedbackCard = ({
  value,
  titleText,
  contentText,
  backgroundColorStyle,
}) => {
  const { fontsLoaded } = useContext(AppContext);

  if (!fontsLoaded) {
    return null; // return null if fonts aren't loaded
  }

  return (
    <AccordionItem
      value={value}
      style={[styles.accordionItem, { backgroundColor: backgroundColorStyle }]}
    >
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
    padding: 14,
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
    fontFamily: "MavenPro-Bold",
  },
  accordionContent: {
    marginTop: 10,
    paddingTop: 3,
  },
  accordionContentText: {
    fontSize: 15.5,
    lineHeight: 21,
    fontFamily: "Mulish-Medium",
  },
});

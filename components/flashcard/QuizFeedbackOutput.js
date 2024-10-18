import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import QuizFeedbackRating from "./QuizFeedbackRating";
import QuizFeedbackTitle from "./QuizFeedbackTitle";
import QuizFeedbackText from "./QuizFeedbackText";
import WideButton from "../common/WideButton";
import QuizFeedbackAnswerDescription from "./QuizFeedbackAnswerDescription";
import BackToCategories from "../common/BackToCategories";
import { AppContext } from "@/store/app-context";

const QuizFeedbackOutput = () => {
  const { item, setItem } = useContext(AppContext);
  const { currentQuestionIndex } = item;

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <QuizFeedbackRating />
      <QuizFeedbackTitle />
      <QuizFeedbackText />
      <QuizFeedbackAnswerDescription />
      <WideButton
        title="Try again"
        color="white"
        size={24}
        onPress={() => {
          navigation.navigate("QuizScreen");
          setItem((prevState) => ({
            ...prevState,
            currentQuestionIndex: 0,
          }));
        }}
      />
      <BackToCategories />
    </View>
  );
};

export default QuizFeedbackOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    rowGap: 24,
    marginBottom: 110,
  },
  text: {
    fontSize: 24,
  },
});

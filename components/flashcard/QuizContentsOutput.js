import { StyleSheet, Text, View } from "react-native";
import ProgressBar from "../common/ProgressBar";
import QuizAnswerOptions from "./QuizAnswerOptions";
import QuizQuestion from "./QuizQuestion";

import Swiper from "react-native-deck-swiper";
import { AppContext } from "../../store/app-context";
import React, { useContext } from "react";

const QuizContentsOutput = () => {
  const { item } = useContext(AppContext);

  const {
    currentQuestionIndex,
    quizAnswerOptions,
    quizQuestionOptions,
    correctAnswerIndex,
  } = item;
  const answerOptions = quizAnswerOptions[currentQuestionIndex];
  const correctAnswerForCurrentQuestion =
    correctAnswerIndex[currentQuestionIndex];

  // Combine questions and answers into a single card object
  const cards = item.quizQuestionOptions.map((question, index) => ({
    question: item.quizQuestionOptions[index],
    answers: item.quizAnswerOptions[index],
  }));

  return (
    <View style={styles.container}>
      <ProgressBar
        currentIndexNum={currentQuestionIndex}
        totalNum={quizQuestionOptions.length}
      />
      <View style={styles.innerContainer}>
        <QuizQuestion
          currentQuestionIndex={currentQuestionIndex}
          quizQuestionOptions={quizQuestionOptions}
        />
        <QuizAnswerOptions
          currentQuestionIndex={currentQuestionIndex}
          quizQuestionOptions={quizQuestionOptions}
          quizAnswerOptions={quizAnswerOptions}
          correctAnswerIndex={correctAnswerIndex}
        />
      </View>
      {/* <Swiper
        cards={cards}
        renderCard={(card) => (
          <View style={styles.cardContainer}> */}
      {/* <ProgressBar number="3" /> */}
      {/* <QuizQuestion questionText={card.question} />
            <QuizAnswerOptions answers={card.answers} />
          </View>
        )}
        onSwiped={(cardIndex) => {
          console.log(cardIndex);
        }}
        cardIndex={0}
        backgroundColor={"white"}
        stackSize={5}
      /> */}
    </View>
  );
};

export default QuizContentsOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // rowGap: 130,
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 10,
    // marginBottom: 50,
    // width: "100%",
    marginHorizontal: 16, // Margin for left and right
    marginBottom: 32,
  },
  innerContainer: {
    flex: 6.5,
    rowGap: 17,
    width: "100%",
  },
  cardContainer: {
    // flex: 1,
    // padding: 12,
    // width: "80%", // Adjust the card width as needed
    // height: "50%",
    // padding: 16,
    // borderRadius: 10,
    // borderWidth: 2,
    // borderColor: "#e0e0e0",
    // backgroundColor: "#fff",
    // width: "85%",
    // justifyContent: "center",
    // alignItems: "center",
  },
});

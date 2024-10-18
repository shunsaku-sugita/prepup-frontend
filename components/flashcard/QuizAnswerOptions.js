import { Modal, StyleSheet, Text, View } from "react-native";
import React, { useContext, useRef, useState } from "react";
import { AppContext } from "../../store/app-context";
import { FlatList } from "react-native-gesture-handler";
import QuizAnswer from "./QuizAnswer";
import WideButton from "../common/WideButton";
import QuizModalCorrectOutput from "./QuizModalCorrectOutput";
import QuizModalFailedOutput from "./QuizModalFailedOutput";
import Swiper from "react-native-deck-swiper";
import { Swipeable } from "react-native-gesture-handler";

const QuizAnswerOptions = ({
  currentQuestionIndex,
  quizAnswerOptions,
  quizQuestionOptions,
  correctAnswerIndex,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  // A state to track which answer is currently selected.
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

  const { item, setItem } = useContext(AppContext);
  // Ref to hold the swipeable component for closing
  const swipeableRef = useRef([]);

  const answerOptions = quizAnswerOptions[currentQuestionIndex];
  const correctAnswerForCurrentQuestion =
    correctAnswerIndex[currentQuestionIndex];

  // Track the question index before updating
  const [prevQuestionIndex, setPrevQuestionIndex] =
    useState(currentQuestionIndex);

  // Combine both quizAnswerOption and quizAnswerText
  // const quizAnswers = item.quizAnswerOptions.map((option, index) => ({
  //   option: item.quizAnswerOrders[index],
  //   text: item.quizAnswerOptions[index],
  // }));

  let quizResultModalScreen = isCorrect ? (
    <QuizModalCorrectOutput
      setModalVisible={setModalVisible}
      setIsSelected={setIsSelected}
      setSelectedAnswerIndex={setSelectedAnswerIndex}
      currentQuestionIndex={prevQuestionIndex} // Pass previous index
      quizQuestionOptions={quizQuestionOptions}
      // onNextQuestion={handleNextQuestion}
      setPrevQuestionIndex={setPrevQuestionIndex}
      setItem={setItem}
      swipeableRef={swipeableRef}
    />
  ) : (
    <QuizModalFailedOutput
      setModalVisible={setModalVisible}
      setIsSelected={setIsSelected}
      setSelectedAnswerIndex={setSelectedAnswerIndex}
      currentQuestionIndex={prevQuestionIndex} // Pass previous index
      quizQuestionOptions={quizQuestionOptions}
      // onNextQuestion={handleNextQuestion}
      setPrevQuestionIndex={setPrevQuestionIndex}
      setItem={setItem}
    />
  );

  const handleSwipeRight = (index) => {
    // Check if the swiped answer is correct
    setSelectedAnswerIndex(index);
    setIsCorrect(index === correctAnswerForCurrentQuestion);
    setModalVisible(true);
  };

  // const handleSwipeLeft = (index) => {
  //   // Swiped left, implying the wrong answer
  //   setSelectedAnswerIndex(index);
  //   setIsCorrect(false);
  //   setModalVisible(true);
  //   // handleNextQuestion();
  // };

  // const handleNextQuestion = () => {
  //   // Store current index before updating
  //   setPrevQuestionIndex(currentQuestionIndex);

  //   if (currentQuestionIndex < quizQuestionOptions.length - 1) {
  //     // Only increment if not the last question
  //     setItem((prevState) => ({
  //       ...prevState,
  //       currentQuestionIndex: prevState.currentQuestionIndex + 1,
  //     }));
  //   }
  // };

  // // Function to handle answer selection
  // const handleAnswerSelect = (selectedAnswerIndex) => {
  //   // Check if there are more questions left
  //   if (currentQuestionIndex < quizQuestionOptions.length - 1) {
  //     // Move to the next question
  //     setItem({
  //       ...item,
  //       currentQuestionIndex: currentQuestionIndex + 1,
  //     });
  //   } else {
  //     setItem({
  //       ...item,
  //       currentQuestionIndex:
  //         currentQuestionIndex - (quizQuestionOptions.length - 1),
  //     });
  //     // Reset or show completion message if needed
  //     alert("You have completed the quiz!");
  //   }
  // };

  const renderSwipeableAnswer = ({ item, index }) => (
    <Swipeable
      renderLeftActions={() => <Text style={styles.swipeAction}>Swiped!</Text>}
      ref={(ref) => (swipeableRef.current[index] = ref)} // Assign ref for each Swipeable
      // renderLeftActions={null} // Disable left actions
      // renderRightActions={() => (
      //   <Text style={styles.swipeAction}>Swipe Left</Text>
      // )}
      onSwipeableLeftOpen={() => handleSwipeRight(index)}
      // onSwipeableRightOpen={() => handleSwipeLeft(index)}
    >
      <View style={styles.answerContainer}>
        <Text style={styles.answerText}>{item}</Text>
      </View>
    </Swipeable>
  );

  const handleModalClose = () => {
    setModalVisible(false);
    // Close the swipeable item programmatically when the modal closes
    swipeableRef.current.forEach((ref) => {
      if (ref) {
        ref.close();
      }
    });
    // if (swipeableRef.current) {
    //   swipeableRef.current.close();
    // }
  };

  return (
    <View style={styles.container}>
      {/* Display current question based on index */}
      {/* <Text style={styles.questionText}>
        {item.quizQuestionOptions[currentQuestionIndex]}
      </Text> */}

      <FlatList
        data={answerOptions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderSwipeableAnswer}
      />
      {/* <Swiper
        cards={quizAnswers}
        renderCard={(item, index) => (
          <QuizAnswer
            quizAnswerOption={item.option}
            quizAnswerText={item.text}
            // Check if this is the selected item
            isSelected={selectedAnswerIndex === index}
            // Set the selected item index on press
            // onPress={() => {
            // onSwipe={() => {
            //   setSelectedAnswerIndex(index);
            //   setModalVisible(true);
            //   setIsCorrect(true);
            // }}
          />
        )}
        onSwipedRight={handleSwipeRight}
        onSwipedLeft={handleSwipeLeft}
        disableLeftSwipe={true}
        cardIndex={0}
        backgroundColor={"white"}
        stackSize={3} // Number of cards to show in the stack
        infinite={false}
      /> */}
      {/* {selectedAnswerIndex !== null && (
        <View style={styles.buttonContainer}>
          <WideButton
            title="Next"
            color="white"
            size={24}
            onPress={() => {
              setModalVisible(true);
              setIsCorrect(true);
            }}
          />
        </View> */}
      {/* )} */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>{quizResultModalScreen}</View>
        </View>
      </Modal>
    </View>
  );
};

export default QuizAnswerOptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  questionText: {
    fontSize: 24,
    textAlign: "center",
    marginVertical: 20,
  },
  answerContainer: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  answerText: {
    fontSize: 18,
  },
  swipeAction: {
    backgroundColor: "#adaead",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 16,
  },
  // container: {
  //   flex: 0.7,
  //   rowGap: 18,
  // },
  // titleText: {
  //   fontSize: 20,
  // },
  // buttonContainer: {
  //   alignItems: "center",
  // },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end", // Align the modal to the bottom of the screen
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent background
  },
  modalContent: {
    height: "50%", // Half-screen height for the modal
    backgroundColor: "#fff",
    borderWidth: 4,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

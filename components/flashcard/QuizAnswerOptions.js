import { Modal, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { AppContext } from "../../store/app-context";
import { FlatList } from "react-native-gesture-handler";
import QuizAnswer from "./QuizAnswer";
import WideButton from "../common/WideButton";
import QuizModalCorrectOutput from "./QuizModalCorrectOutput";
import QuizModalFailedOutput from "./QuizModalFailedOutput";

const QuizAnswerOptions = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  // A state to track which answer is currently selected.
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

  const { item, setItem } = useContext(AppContext);
  // Combine both quizAnswerOption and quizAnswerText
  const quizAnswers = item.quizAnswerOption.map((option, index) => ({
    option: item.quizAnswerOption[index],
    text: item.quizAnswerText[index],
  }));

  let quizResultModalScreen = (
    <QuizModalCorrectOutput
      setModalVisible={setModalVisible}
      setIsSelected={setIsSelected}
      setSelectedAnswerIndex={setSelectedAnswerIndex}
    />
  );
  if (!isCorrect) {
    quizResultModalScreen = (
      <QuizModalFailedOutput
        setModalVisible={setModalVisible}
        setIsSelected={setIsSelected}
        setSelectedAnswerIndex={setSelectedAnswerIndex}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={quizAnswers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <QuizAnswer
            quizAnswerOption={item.option}
            quizAnswerText={item.text}
            // Set the selected item index on press
            onPress={() => setSelectedAnswerIndex(index)}
            // Check if this is the selected item
            isSelected={selectedAnswerIndex === index}
          />
        )}
      />
      {selectedAnswerIndex !== null && (
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
        </View>
      )}

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
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
    rowGap: 18,
  },
  titleText: {
    fontSize: 20,
  },
  buttonContainer: {
    alignItems: "center",
  },
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

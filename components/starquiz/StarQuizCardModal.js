import {
  Alert,
  // Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import IconButton from "../common/IconButton";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Modal from "react-native-modal";

const StarQuizCardModal = ({
  situationAnswerRef,
  setSituationAnswer,
  taskAnswerRef,
  setTaskAnswer,
  actionAnswerRef,
  setActionAnswer,
  resultAnswerRef,
  setResultAnswer,
  situationInputRef,
  taskInputRef,
  actionInputRef,
  resultInputRef,
  answers,
  setAnswers,
  scrollViewRef,
  handleBlur,
  handleFocus,
  situationIsCharacterLimit,
  setSituationIsCharacterLimit,
  taskIsCharacterLimit,
  setTaskIsCharacterLimit,
  actionIsCharacterLimit,
  setActionIsCharacterLimit,
  resultIsCharacterLimit,
  setResultIsCharacterLimit,
  situationCountNumber,
  setSituationCountNumber,
  taskCountNumber,
  setTaskCountNumber,
  actionCountNumber,
  setActionCountNumber,
  resultCountNumber,
  setResultCountNumber,
  modalVisible,
  setModalVisible,
  backgroundColor,
  handleModalClose,
}) => {
  // Handle auto-focus when the modal opens
  useEffect(() => {
    if (modalVisible.situation && situationInputRef?.current) {
      situationInputRef.current.focus();
    }
    if (modalVisible.task && taskInputRef?.current) {
      taskInputRef.current.focus();
    }
    if (modalVisible.action && actionInputRef?.current) {
      actionInputRef.current.focus();
    }
    if (modalVisible.result && resultInputRef?.current) {
      resultInputRef.current.focus();
    }
  }, [modalVisible]);

  // Handle blur when the modal starts closing
  const onModalWillClose = () => {
    if (situationInputRef?.current) situationInputRef.current.blur();
    if (taskInputRef?.current) taskInputRef.current.blur();
    if (actionInputRef?.current) actionInputRef.current.blur();
    if (resultInputRef?.current) resultInputRef.current.blur();
    handleModalClose();
  };

  const handleSwipeClose = () => {
    Keyboard.dismiss(); // Ensure TextInput loses focus
    handleModalClose();
  };

  const textChangeHandler = (
    text,
    setAnswer,
    ref,
    setCountNumber,
    answerKey
  ) => {
    // don't allow users to type over 100 characters
    if (text.length > 500) {
      if (text.length > currentAnswer.length) {
        return;
      }
    }

    // update the reference with the new value
    ref.current = text;

    // update the character count, TextInput field and limit count numbers
    setCountNumber(text.length);
    setAnswer(text);

    if (answerKey === "situation") {
      setSituationIsCharacterLimit(text.length === 500);
    } else if (answerKey === "task") {
      setTaskIsCharacterLimit(text.length === 500);
    } else if (answerKey === "action") {
      setActionIsCharacterLimit(text.length === 500);
    } else if (answerKey === "result") {
      setResultIsCharacterLimit(text.length === 500);
    }

    // update the answers in the state
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [answerKey]: text, // update the specific field
    }));
  };

  return (
    <>
      {/* Situation modal */}
      <Modal
        isVisible={modalVisible.situation}
        // onSwipeComplete={handleSwipeClose}
        swipeDirection="down"
        // onBackdropPress={handleSwipeClose}
        backdropOpacity={0}
        onModalWillHide={handleSwipeClose}
        style={styles.modal}
      >
        <View style={styles.modalContainer}>
          <View
            style={[styles.modalContent, { backgroundColor: backgroundColor }]}
          >
            <View style={styles.modalHeaderContainer}>
              <Text style={styles.title}>Situation</Text>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                ref={situationInputRef}
                multiline={true}
                placeholder="Write your answer here."
                placeholderTextColor={Colors.placeHolderTextGray}
                keyboardType="default"
                value={answers?.situation}
                maxLength={500}
                onChangeText={(text) => {
                  textChangeHandler(
                    text,
                    setSituationAnswer,
                    situationAnswerRef,
                    setSituationCountNumber,
                    "situation"
                  );
                }}
                onBlur={() => handleBlur("situation")}
              />
            </View>
            <View style={styles.countNumberContainer}>
              <Text
                style={[
                  styles.wordCountText,
                  situationIsCharacterLimit && styles.situationWordCountLimit,
                ]}
              >
                {situationCountNumber}/500 Characters
              </Text>
            </View>
          </View>
        </View>
      </Modal>

      {/* Task modal */}
      <Modal
        isVisible={modalVisible.task}
        onSwipeComplete={handleSwipeClose}
        swipeDirection="down"
        onBackdropPress={handleSwipeClose}
        backdropOpacity={0}
        style={styles.modal}
      >
        <View style={styles.modalContainer}>
          <View
            style={[styles.modalContent, { backgroundColor: backgroundColor }]}
          >
            <View style={styles.modalHeaderContainer}>
              <Text style={styles.title}>Task</Text>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                ref={taskInputRef}
                multiline={true}
                placeholder="Write your answer here."
                placeholderTextColor={Colors.placeHolderTextGray}
                keyboardType="default"
                value={answers?.task}
                maxLength={500}
                onChangeText={(text) => {
                  textChangeHandler(
                    text,
                    setTaskAnswer,
                    taskAnswerRef,
                    setTaskCountNumber,
                    "task"
                  );
                }}
                onBlur={() => handleBlur("task")}
              />
            </View>
            <View style={styles.countNumberContainer}>
              <Text
                style={[
                  styles.wordCountText,
                  taskIsCharacterLimit && styles.taskWordCountLimit,
                ]}
              >
                {taskCountNumber}/500 Characters
              </Text>
            </View>
          </View>
        </View>
      </Modal>

      {/* Action modal */}
      <Modal
        isVisible={modalVisible.action}
        onSwipeComplete={handleSwipeClose}
        swipeDirection="down"
        onBackdropPress={handleSwipeClose}
        backdropOpacity={0}
        style={styles.modal}
      >
        <View style={styles.modalContainer}>
          <View
            style={[styles.modalContent, { backgroundColor: backgroundColor }]}
          >
            <View style={styles.modalHeaderContainer}>
              <Text style={styles.title}>Action</Text>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                ref={actionInputRef}
                multiline={true}
                placeholder="Write your answer here."
                placeholderTextColor={Colors.placeHolderTextGray}
                keyboardType="default"
                value={answers?.action}
                maxLength={500}
                onChangeText={(text) => {
                  textChangeHandler(
                    text,
                    setActionAnswer,
                    actionAnswerRef,
                    setActionCountNumber,
                    "action"
                  );
                }}
                onBlur={() => handleBlur("action")}
              />
            </View>
            <View style={styles.countNumberContainer}>
              <Text
                style={[
                  styles.wordCountText,
                  actionIsCharacterLimit && styles.actionWordCountLimit,
                ]}
              >
                {actionCountNumber}/500 Characters
              </Text>
            </View>
          </View>
        </View>
      </Modal>

      {/* Result modal */}
      <Modal
        isVisible={modalVisible.result}
        onSwipeComplete={handleSwipeClose}
        swipeDirection="down"
        onBackdropPress={handleSwipeClose}
        backdropOpacity={0}
        style={styles.modal}
      >
        <View style={styles.modalContainer}>
          <View
            style={[styles.modalContent, { backgroundColor: backgroundColor }]}
          >
            <View style={styles.modalHeaderContainer}>
              <Text style={styles.title}>Result</Text>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                ref={resultInputRef}
                multiline={true}
                placeholder="Write your answer here."
                placeholderTextColor={Colors.placeHolderTextGray}
                keyboardType="default"
                value={answers?.result}
                maxLength={500}
                onChangeText={(text) => {
                  textChangeHandler(
                    text,
                    setResultAnswer,
                    resultAnswerRef,
                    setResultCountNumber,
                    "result"
                  );
                }}
                onBlur={() => handleBlur("result")}
              />
            </View>
            <View style={styles.countNumberContainer}>
              <Text
                style={[
                  styles.wordCountText,
                  resultIsCharacterLimit && styles.resultWordCountLimit,
                ]}
              >
                {resultCountNumber}/500 Characters
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default StarQuizCardModal;

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    // shadow for android
    elevation: 5,
    // shadow for iOS
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    shadowOpacity: 0.6,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end", // Align the modal to the bottom of the screen
    width: "100%",
  },
  modalContent: {
    height: "75%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 8,
    alignItems: "flex-end",
  },
  modalHeaderContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textInputContainer: {
    backgroundColor: "white",
    borderRadius: 6,
    padding: 8,
    height: "37%",
    width: "100%",
  },
  countNumberContainer: {
    marginTop: 6,
  },
  wordCountText: {
    fontWeight: "bold",
  },
  situationWordCountLimit: {
    color: "red",
    fontWeight: "bold",
  },
  taskWordCountLimit: {
    color: "red",
    fontWeight: "bold",
  },
  actionWordCountLimit: {
    color: "red",
    fontWeight: "bold",
  },
  resultWordCountLimit: {
    color: "red",
    fontWeight: "bold",
  },
});

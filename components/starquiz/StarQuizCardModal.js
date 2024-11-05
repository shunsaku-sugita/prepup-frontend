import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import IconButton from "../common/IconButton";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const StarQuizCardModal = ({
  situationAnswerRef,
  setSituationAnswer,
  taskAnswerRef,
  setTaskAnswer,
  actionAnswerRef,
  setActionAnswer,
  resultAnswerRef,
  setResultAnswer,
  answers,
  setAnswers,
  scrollViewRef,
  handleBlur,
  handleFocus,
  isCharacterLimit,
  setIsCharacterLimit,
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
    setIsCharacterLimit(text.length === 500);

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
        animationType="slide"
        transparent={true}
        visible={modalVisible.situation}
      >
        <View style={styles.modalContainer}>
          <View
            style={[styles.modalContent, { backgroundColor: backgroundColor }]}
          >
            <View>
              <View style={styles.modalHeaderContainer}>
                <TouchableOpacity onPress={() => handleModalClose("situation")}>
                  <IconButton
                    icon="arrow-back"
                    color="black"
                    size={20}
                    display={!situationAnswerRef.current && true}
                  />
                </TouchableOpacity>
                <Text style={styles.title}>Situation</Text>
                <View></View>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
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
                    isCharacterLimit && styles.situationWordCountLimit,
                  ]}
                >
                  {situationCountNumber}/500 Characters
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Task modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible.task}
      >
        <View style={styles.modalContainer}>
          <View
            style={[styles.modalContent, { backgroundColor: backgroundColor }]}
          >
            <View>
              <View style={styles.modalHeaderContainer}>
                <TouchableOpacity onPress={() => handleModalClose("task")}>
                  <IconButton
                    icon="arrow-back"
                    color="black"
                    size={20}
                    display={!taskAnswerRef.current && true}
                  />
                </TouchableOpacity>
                <Text style={styles.title}>Task</Text>
                <View></View>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
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
                    isCharacterLimit && styles.taskWordCountLimit,
                  ]}
                >
                  {taskCountNumber}/500 Characters
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Action modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible.action}
      >
        <View style={styles.modalContainer}>
          <View
            style={[styles.modalContent, { backgroundColor: backgroundColor }]}
          >
            <View>
              <View style={styles.modalHeaderContainer}>
                <TouchableOpacity onPress={() => handleModalClose("action")}>
                  <IconButton
                    icon="arrow-back"
                    color="black"
                    size={20}
                    display={!actionAnswerRef.current && true}
                  />
                </TouchableOpacity>
                <Text style={styles.title}>Action</Text>
                <View></View>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
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
                    isCharacterLimit && styles.actionWordCountLimit,
                  ]}
                >
                  {actionCountNumber}/500 Characters
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Result modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible.result}
      >
        <View style={styles.modalContainer}>
          <View
            style={[styles.modalContent, { backgroundColor: backgroundColor }]}
          >
            <View>
              <View style={styles.modalHeaderContainer}>
                <TouchableOpacity onPress={() => handleModalClose("result")}>
                  <IconButton
                    icon="arrow-back"
                    color="black"
                    size={20}
                    display={!resultAnswerRef.current && true}
                  />
                </TouchableOpacity>
                <Text style={styles.title}>Result</Text>
                <View></View>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
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
                    isCharacterLimit && styles.resultWordCountLimit,
                  ]}
                >
                  {resultCountNumber}/500 Characters
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default StarQuizCardModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end", // Align the modal to the bottom of the screen
    backgroundColor: "rgba(0, 0, 0, 0.1)", // Transparent background
    width: "100%",
  },
  modalContent: {
    height: "73%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  modalHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 25,
  },
  textInputContainer: {
    backgroundColor: "white",
    borderRadius: 6,
    padding: 8,
    height: "55%",
  },
  countNumberContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
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

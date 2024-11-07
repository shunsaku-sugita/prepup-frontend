import { useRoute } from "@react-navigation/native";
import { Colors } from "@/constants/Colors";
import { AppContext } from "@/store/app-context";
import React, { useState, useEffect, useContext } from "react";
import { View, TextInput, Text, Button, StyleSheet } from "react-native";
import HearableQuestions from "@/components/common/HearableQuestions";

const StarModalScreen = () => {
  const {
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
    handleBlur,
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
    starQuestionText,
    fieldType,
  } = useContext(AppContext);

  useEffect(() => {
    // Focus on the input field when the screen is opened
    if (fieldType === "situation" && situationInputRef.current)
      situationInputRef.current.focus();
    if (fieldType === "task" && taskInputRef.current)
      taskInputRef.current.focus();
    if (fieldType === "action" && actionInputRef.current)
      actionInputRef.current.focus();
    if (fieldType === "result" && resultInputRef.current)
      resultInputRef.current.focus();
  }, [fieldType]);

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
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <HearableQuestions questionText={starQuestionText} />
      </View>
      <View style={styles.modalContainer}>
        {/* Situation screen */}
        {fieldType === "situation" && (
          <View
            style={[
              styles.modalContent,
              { backgroundColor: Colors.disabledYellow },
            ]}
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
        )}
        {/* Task screen */}
        {fieldType === "task" && (
          <View
            style={[
              styles.modalContent,
              { backgroundColor: Colors.disabledRed },
            ]}
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
        )}
        {/* Action screen */}
        {fieldType === "action" && (
          <View
            style={[
              styles.modalContent,
              { backgroundColor: Colors.disabledBlue },
            ]}
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
        )}
        {/* Result screen */}
        {fieldType === "result" && (
          <View
            style={[
              styles.modalContent,
              { backgroundColor: Colors.defaultBeige },
            ]}
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
        )}
      </View>
    </View>
  );
};

export default StarModalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.disabledBeige,
    alignItems: "center",
    justifyContent: "center",
  },
  questionContainer: {
    flex: 0.9,
    marginTop: 5,
  },
  modalContainer: {
    flex: 6,
    justifyContent: "flex-end", // Align the modal to the bottom of the screen
    width: "100%",
    marginTop: 6,
    // shadow for android
    elevation: 6,
    // shadow for iOS
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 7,
    shadowOpacity: 0.8,
  },
  modalContent: {
    height: "100%",
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
    marginTop: 4,
    marginBottom: 8,
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
    marginTop: 8,
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

import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import IconButton from "../common/IconButton";
import * as Speech from "expo-speech";
import { TouchableOpacity } from "react-native-gesture-handler";

const StarQuizCarousel = ({
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
  handleBlur,
  scrollViewRef,
}) => {
  const [situationCountNumber, setSituationCountNumber] = useState(0);
  const [taskCountNumber, setTaskCountNumber] = useState(0);
  const [actionCountNumber, setActionCountNumber] = useState(0);
  const [resultCountNumber, setResultCountNumber] = useState(0);

  const [isCharacterLimit, setIsCharacterLimit] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);

  const speakHandler = async (textToSpeak) => {
    const speaking = await Speech.isSpeakingAsync();

    if (!speaking && !isPlaying) {
      // Start speaking the current question
      Speech.speak(textToSpeak, {
        // Reset state when speech is finished
        onDone: () => setIsPlaying(false),
      });
      setIsPlaying(true); // Mark as playing
    } else if (speaking) {
      // Stop the speech
      Speech.stop();
      setIsPlaying(false); // Reset the state to not playing
    }
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
    setIsCharacterLimit(text.length === 500);

    // update the answers in the state
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [answerKey]: text, // update the specific field
    }));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        contentContainerStyle={styles.carouselContainer}
      >
        <View style={styles.cardContainer}>
          <View style={styles.cardHeaderContainer}>
            <Text style={styles.title}>Situation:</Text>
            <View>
              <IconButton
                icon={isPlaying ? "stop-circle-outline" : "ear-outline"}
                color={situationAnswerRef.current ? "black" : "#aaa"}
                size={20}
                display={!situationAnswerRef.current && true}
                onPress={() => speakHandler(situationAnswerRef.current)}
              />
            </View>
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              multiline={true}
              placeholder="Write your answer here."
              placeholderTextColor="#565656"
              keyboardType="default"
              value={answers.situation}
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
          <View style={styles.resetCountNumberContainer}>
            <TouchableOpacity
              style={styles.resetTextContainer}
              disabled={!situationAnswerRef.current && true}
              onPress={() => {
                Alert.alert(
                  "Reset the Situation text field?",
                  "The process is unsaved, you will lose it.",
                  [
                    {
                      text: "Cancel",
                    },
                    {
                      text: "Confirm",
                      onPress: () => {
                        // clear the answer both in state and the ref
                        setSituationAnswer("");
                        situationAnswerRef.current = "";

                        // update the answers object
                        setAnswers((prevAnswers) => ({
                          ...prevAnswers,
                          situation: "", // Reset the specific field
                        }));
                      },
                    },
                  ]
                );
              }}
            >
              <Text
                style={
                  situationAnswerRef.current
                    ? styles.resetText
                    : styles.resetTextDiabled
                }
              >
                Reset
              </Text>
            </TouchableOpacity>
            <Text style={isCharacterLimit && styles.wordCountLimit}>
              {situationCountNumber}/500
            </Text>
          </View>
          <View style={styles.cardFooterContainer}>
            <View></View>
            <View style={styles.swipeContainer}>
              <Text style={styles.swipeText}>Swipe right</Text>
              <IconButton icon="arrow-forward" size={16} />
            </View>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.cardHeaderContainer}>
            <Text style={styles.title}>Task:</Text>
            <IconButton
              icon={isPlaying ? "stop-circle-outline" : "ear-outline"}
              color={taskAnswerRef.current ? "black" : "#aaa"}
              size={20}
              display={!taskAnswerRef.current && true}
              onPress={() => speakHandler(taskAnswerRef.current)}
            />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              multiline={true}
              placeholder="Write your answer here."
              placeholderTextColor="#565656"
              keyboardType="default"
              value={answers.task}
              maxLength={500}
              onChangeText={(text) =>
                textChangeHandler(
                  text,
                  setTaskAnswer,
                  taskAnswerRef,
                  setTaskCountNumber,
                  "task"
                )
              }
              onBlur={() => handleBlur("task")}
            />
          </View>
          <View style={styles.resetCountNumberContainer}>
            <TouchableOpacity
              style={styles.resetTextContainer}
              disabled={!taskAnswerRef.current && true}
              onPress={() => {
                Alert.alert(
                  "Reset the Task text field?",
                  "The process is unsaved, you will lose it.",
                  [
                    {
                      text: "Cancel",
                    },
                    {
                      text: "Confirm",
                      onPress: () => {
                        // clear the answer both in state and the ref
                        setTaskAnswer("");
                        taskAnswerRef.current = "";

                        // update the answers object
                        setAnswers((prevAnswers) => ({
                          ...prevAnswers,
                          task: "",
                        }));
                      },
                    },
                  ]
                );
              }}
            >
              <Text
                style={
                  taskAnswerRef.current
                    ? styles.resetText
                    : styles.resetTextDiabled
                }
              >
                Reset
              </Text>
            </TouchableOpacity>
            <Text style={isCharacterLimit && styles.wordCountLimit}>
              {taskCountNumber}/500
            </Text>
          </View>
          <View style={styles.cardFooterContainer}>
            <View style={styles.swipeContainer}>
              <IconButton icon="arrow-back" size={16} />
              <Text style={styles.swipeText}>Swipe left</Text>
            </View>
            <View style={styles.swipeContainer}>
              <Text style={styles.swipeText}>Swipe right</Text>
              <IconButton icon="arrow-forward" size={16} />
            </View>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.cardHeaderContainer}>
            <Text style={styles.title}>Action:</Text>
            <IconButton
              icon={isPlaying ? "stop-circle-outline" : "ear-outline"}
              color={actionAnswerRef.current ? "black" : "#aaa"}
              size={20}
              display={!actionAnswerRef.current && true}
              onPress={() => speakHandler(actionAnswerRef.current)}
            />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              multiline={true}
              placeholder="Write your answer here."
              placeholderTextColor="#565656"
              keyboardType="default"
              value={answers.action}
              maxLength={500}
              onChangeText={(text) =>
                textChangeHandler(
                  text,
                  setActionAnswer,
                  actionAnswerRef,
                  setActionCountNumber,
                  "action"
                )
              }
              onBlur={() => handleBlur("action")}
            />
          </View>
          <View style={styles.resetCountNumberContainer}>
            <TouchableOpacity
              style={styles.resetTextContainer}
              disabled={!actionAnswerRef.current && true}
              onPress={() => {
                Alert.alert(
                  "Reset the Action text field?",
                  "The process is unsaved, you will lose it.",
                  [
                    {
                      text: "Cancel",
                    },
                    {
                      text: "Confirm",
                      onPress: () => {
                        // clear the answer both in state and the ref
                        setActionAnswer("");
                        actionAnswerRef.current = "";

                        // update the answers object
                        setAnswers((prevAnswers) => ({
                          ...prevAnswers,
                          action: "",
                        }));
                      },
                    },
                  ]
                );
              }}
            >
              <Text
                style={
                  actionAnswerRef.current
                    ? styles.resetText
                    : styles.resetTextDiabled
                }
              >
                Reset
              </Text>
            </TouchableOpacity>
            <Text style={isCharacterLimit && styles.wordCountLimit}>
              {actionCountNumber}/500
            </Text>
          </View>
          <View style={styles.cardFooterContainer}>
            <View style={styles.swipeContainer}>
              <IconButton icon="arrow-back" size={16} />
              <Text style={styles.swipeText}>Swipe left</Text>
            </View>
            <View style={styles.swipeContainer}>
              <Text style={styles.swipeText}>Swipe right</Text>
              <IconButton icon="arrow-forward" size={16} />
            </View>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.cardHeaderContainer}>
            <Text style={styles.title}>Result:</Text>
            <IconButton
              icon={isPlaying ? "stop-circle-outline" : "ear-outline"}
              color={resultAnswerRef.current ? "black" : "#aaa"}
              size={20}
              display={!resultAnswerRef.current && true}
              onPress={() => speakHandler(resultAnswerRef.current)}
            />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              multiline={true}
              placeholder="Write your answer here."
              placeholderTextColor="#565656"
              keyboardType="default"
              value={answers.result}
              maxLength={500}
              onChangeText={(text) =>
                textChangeHandler(
                  text,
                  setResultAnswer,
                  resultAnswerRef,
                  setResultCountNumber,
                  "result"
                )
              }
              onBlur={() => handleBlur("result")}
            />
          </View>
          <View style={styles.resetCountNumberContainer}>
            <TouchableOpacity
              style={styles.resetTextContainer}
              disabled={!resultAnswerRef.current && true}
              onPress={() => {
                Alert.alert(
                  "Reset the Result text field?",
                  "The process is unsaved, you will lose it.",
                  [
                    {
                      text: "Cancel",
                    },
                    {
                      text: "Confirm",
                      onPress: () => {
                        // clear the answer both in state and the ref
                        setResultAnswer("");
                        resultAnswerRef.current = "";

                        // update the answers object
                        setAnswers((prevAnswers) => ({
                          ...prevAnswers,
                          result: "",
                        }));
                      },
                    },
                  ]
                );
              }}
            >
              <Text
                style={
                  resultAnswerRef.current
                    ? styles.resetText
                    : styles.resetTextDiabled
                }
              >
                Reset
              </Text>
            </TouchableOpacity>
            <Text style={isCharacterLimit && styles.wordCountLimit}>
              {resultCountNumber}/500
            </Text>
          </View>
          <View style={styles.cardFooterContainer}>
            <View style={styles.swipeContainer}>
              <IconButton icon="arrow-back" size={16} />
              <Text style={styles.swipeText}>Swipe left</Text>
            </View>
            <View></View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default StarQuizCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 6,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 100,
    width: "90%",
  },
  carouselContainer: {
    // flex: 1,
    // height: 500,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: "#ddd",
    marginHorizontal: 7, // horizontal gap between cards
    width: 310,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  cardHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  cardFooterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  swipeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  swipeText: {
    fontSize: 16,
  },
  textInputContainer: {
    backgroundColor: "white",
    borderRadius: 6,
    padding: 10,
    height: "75%",
  },
  resetCountNumberContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 4,
    marginHorizontal: 8,
  },
  resetText: {
    textDecorationLine: "underline",
  },
  resetTextDiabled: {
    textDecorationLine: "underline",
    color: "#aaa",
  },
  wordCountLimit: {
    color: "red",
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

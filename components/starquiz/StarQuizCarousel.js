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
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const StarQuizCarousel = ({
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
  handleFocus,
  scrollViewRef,
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
}) => {
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

  // function to handle card press and scroll to a specific position
  const scrollToCard = (xPosition) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: xPosition, animated: true });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        contentContainerStyle={styles.carouselContainer}
        showsHorizontalScrollIndicator={false}
      >
        {/* Situation card */}
        <TouchableOpacity
          onPress={() => scrollToCard(0)}
          style={styles.touchableOpacityWrapper}
        >
          <View
            style={[
              styles.cardContainer,
              { backgroundColor: Colors.defaultYellow },
            ]}
          >
            <View style={styles.cardHeaderContainer}>
              <Text style={styles.title}>Situation:</Text>
              <View>
                <IconButton
                  icon={isPlaying ? "stop-circle-outline" : "ear-outline"}
                  color={
                    situationAnswerRef.current
                      ? "black"
                      : Colors.placeHolderTextGray
                  }
                  size={20}
                  display={!situationAnswerRef.current && true}
                  onPress={() => speakHandler(situationAnswerRef.current)}
                />
              </View>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                ref={situationInputRef}
                multiline={true}
                placeholder="Write your answer here."
                placeholderTextColor={Colors.placeHolderTextGray}
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
                onFocus={() => handleFocus("situation")}
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
        </TouchableOpacity>

        {/* Task card */}
        <TouchableOpacity
          onPress={() => scrollToCard(322)}
          style={styles.touchableOpacityWrapper}
        >
          <View
            style={[
              styles.cardContainer,
              { backgroundColor: Colors.defaultRed },
            ]}
            onPress={() =>
              scrollViewRef.current &&
              scrollViewRef.current.scrollTo({ x: 200, animated: true })
            }
          >
            <View style={styles.cardHeaderContainer}>
              <Text style={styles.title}>Task:</Text>
              <IconButton
                icon={isPlaying ? "stop-circle-outline" : "ear-outline"}
                color={
                  taskAnswerRef.current ? "black" : Colors.placeHolderTextGray
                }
                size={20}
                display={!taskAnswerRef.current && true}
                onPress={() => speakHandler(taskAnswerRef.current)}
              />
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                ref={taskInputRef}
                multiline={true}
                placeholder="Write your answer here."
                placeholderTextColor={Colors.placeHolderTextGray}
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
                onFocus={() => handleFocus("task")}
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
        </TouchableOpacity>

        {/* Action card */}
        <TouchableOpacity
          onPress={() => scrollToCard(645)}
          style={styles.touchableOpacityWrapper}
        >
          <View
            style={[
              styles.cardContainer,
              { backgroundColor: Colors.defaultBlue },
            ]}
          >
            <View style={styles.cardHeaderContainer}>
              <Text style={styles.title}>Action:</Text>
              <IconButton
                icon={isPlaying ? "stop-circle-outline" : "ear-outline"}
                color={
                  actionAnswerRef.current ? "black" : Colors.placeHolderTextGray
                }
                size={20}
                display={!actionAnswerRef.current && true}
                onPress={() => speakHandler(actionAnswerRef.current)}
              />
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                ref={actionInputRef}
                multiline={true}
                placeholder="Write your answer here."
                placeholderTextColor={Colors.placeHolderTextGray}
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
                onFocus={() => handleFocus("action")}
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
        </TouchableOpacity>

        {/* Result card */}
        <TouchableOpacity
          onPress={() => scrollToCard(970)}
          style={styles.touchableOpacityWrapper}
        >
          <View
            style={[
              styles.cardContainer,
              { backgroundColor: Colors.onPressBeige },
            ]}
          >
            <View style={styles.cardHeaderContainer}>
              <Text style={styles.title}>Result:</Text>
              <IconButton
                icon={isPlaying ? "stop-circle-outline" : "ear-outline"}
                color={
                  resultAnswerRef.current ? "black" : Colors.placeHolderTextGray
                }
                size={20}
                display={!resultAnswerRef.current && true}
                onPress={() => speakHandler(resultAnswerRef.current)}
              />
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                ref={resultInputRef}
                multiline={true}
                placeholder="Write your answer here."
                placeholderTextColor={Colors.placeHolderTextGray}
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
                onFocus={() => handleFocus("result")}
                onBlur={() => handleBlur("result")}
              />
            </View>
            <View style={styles.countNumberContainer}>
              {/* <TouchableOpacity
                style={
                  resultAnswerRef.current
                    ? styles.resetIconContainer
                    : styles.resetIconContainerDiabled
                }
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
                            result: "", // Reset the specific field
                          }));
                        },
                      },
                    ]
                  );
                }}
              >
                <Ionicons name="backspace-outline" color="white" size={24} />
              </TouchableOpacity> */}
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
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default StarQuizCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 6,
    backgroundColor: Colors.defaultBeige,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 100,
    width: "90%",
  },
  carouselContainer: {},
  touchableOpacityWrapper: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    marginHorizontal: 7, // horizontal gap between cards
    width: 310,
    paddingTop: 16,
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
  countNumberContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 12,
  },
  // resetIconContainer: {
  //   backgroundColor: Colors.backgroundDarkGray,
  //   borderRadius: 6,
  //   padding: 6,
  // },
  // resetIconContainerDiabled: {
  //   backgroundColor: Colors.placeHolderTextGray,
  //   borderRadius: 6,
  //   padding: 6,
  // },
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

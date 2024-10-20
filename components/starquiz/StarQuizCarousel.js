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
  situationAnswer,
  setSituationAnswer,
  taskAnswer,
  setTaskAnswer,
  actionAnswer,
  setActionAnswer,
  resultAnswer,
  setResultAnswer,
}) => {
  const [situationWordCount, setSituationWordCount] = useState(0);
  const [taskWordCount, setTaskWordCount] = useState(0);
  const [actionWordCount, setActionWordCount] = useState(0);
  const [resultWordCount, setResultWordCount] = useState(0);

  const [isWordLimit, setIsWordLimit] = useState(false);

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

  const textChangeHandler = (text, setAnswer, currentAnswer, setWordCount) => {
    // Split the text into words and filter out any empty strings
    // "split(/\s+/)" splits the string into an array of words, ignoring successive spaces. "/\s+/" is a regular expression that matches one or more whitespace characters (spaces, tabs, etc.).
    const words = text.trim().split(/\s+/).filter(Boolean);
    // Update the answer and word count if within limit
    if (words.length <= 150 || text.length < currentAnswer.length) {
      setIsWordLimit(false);
      setWordCount(words.length);
      setAnswer(text); // update any TextInput fields
    }
    if (words.length === 150) {
      setIsWordLimit(true);
      // Only allow deletions, and don't allow additions
      setAnswer(text);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.carouselContainer}
      >
        <View style={styles.cardContainer}>
          <View style={styles.cardHeaderContainer}>
            <Text style={styles.title}>Situation:</Text>
            <View>
              <IconButton
                icon={isPlaying ? "stop-circle-outline" : "ear-outline"}
                color={situationAnswer ? "black" : "#aaa"}
                size={20}
                display={!situationAnswer && true}
                onPress={() => speakHandler(situationAnswer)}
              />
            </View>
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              multiline={true}
              placeholder="Write your answer here."
              placeholderTextColor="#565656"
              keyboardType="default"
              value={situationAnswer}
              onChangeText={(text) =>
                textChangeHandler(
                  text,
                  setSituationAnswer,
                  situationAnswer,
                  setSituationWordCount
                )
              }
            />
          </View>
          <View style={styles.resetWordCountContainer}>
            <TouchableOpacity
              style={styles.resetTextContainer}
              disabled={!situationAnswer && true}
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
                        setSituationAnswer("");
                      },
                    },
                  ]
                );
              }}
            >
              <Text
                style={
                  situationAnswer ? styles.resetText : styles.resetTextDiabled
                }
              >
                Reset
              </Text>
            </TouchableOpacity>
            <Text style={isWordLimit && styles.wordCountLimit}>
              {situationWordCount}/150
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
              color={taskAnswer ? "black" : "#aaa"}
              size={20}
              display={!taskAnswer && true}
              onPress={() => speakHandler(taskAnswer)}
            />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              multiline={true}
              placeholder="Write your answer here."
              placeholderTextColor="#565656"
              keyboardType="default"
              value={taskAnswer}
              onChangeText={(text) =>
                textChangeHandler(
                  text,
                  setTaskAnswer,
                  taskAnswer,
                  setTaskWordCount
                )
              }
            />
          </View>
          <View style={styles.resetWordCountContainer}>
            <TouchableOpacity
              style={styles.resetTextContainer}
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
                        setTaskAnswer("");
                      },
                    },
                  ]
                );
              }}
            >
              <Text
                style={taskAnswer ? styles.resetText : styles.resetTextDiabled}
              >
                Reset
              </Text>
            </TouchableOpacity>
            <Text style={isWordLimit && styles.wordCountLimit}>
              {taskWordCount}/150
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
              color={actionAnswer ? "black" : "#aaa"}
              size={20}
              display={!actionAnswer && true}
              onPress={() => speakHandler(actionAnswer)}
            />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              multiline={true}
              placeholder="Write your answer here."
              placeholderTextColor="#565656"
              keyboardType="default"
              value={actionAnswer}
              onChangeText={(text) =>
                textChangeHandler(
                  text,
                  setActionAnswer,
                  actionAnswer,
                  setActionWordCount
                )
              }
            />
          </View>
          <View style={styles.resetWordCountContainer}>
            <TouchableOpacity
              style={styles.resetTextContainer}
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
                        setActionAnswer("");
                      },
                    },
                  ]
                );
              }}
            >
              <Text
                style={
                  actionAnswer ? styles.resetText : styles.resetTextDiabled
                }
              >
                Reset
              </Text>
            </TouchableOpacity>
            <Text style={isWordLimit && styles.wordCountLimit}>
              {actionWordCount}/150
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
              color={resultAnswer ? "black" : "#aaa"}
              size={20}
              display={!resultAnswer && true}
              onPress={() => speakHandler(resultAnswer)}
            />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              multiline={true}
              placeholder="Write your answer here."
              placeholderTextColor="#565656"
              keyboardType="default"
              value={resultAnswer}
              onChangeText={(text) =>
                textChangeHandler(
                  text,
                  setResultAnswer,
                  resultAnswer,
                  setResultWordCount
                )
              }
            />
          </View>
          <View style={styles.resetWordCountContainer}>
            <TouchableOpacity
              style={styles.resetTextContainer}
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
                        setResultAnswer("");
                      },
                    },
                  ]
                );
              }}
            >
              <Text
                style={
                  resultAnswer ? styles.resetText : styles.resetTextDiabled
                }
              >
                Reset
              </Text>
            </TouchableOpacity>
            <Text style={isWordLimit && styles.wordCountLimit}>
              {resultWordCount}/150
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
    marginTop: 20,
    marginBottom: 140,
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
    marginTop: 10,
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
  resetWordCountContainer: {
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

import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "./IconButton";
import * as Speech from "expo-speech";

const HearableQuestions = ({ questionText }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const speakHandler = async () => {
    const speaking = await Speech.isSpeakingAsync();

    if (!speaking && !isPlaying) {
      // Start speaking the current question
      Speech.speak(questionText, {
        // Reset state when speech is finished
        onDone: () => setIsPlaying(false),
      });
      setIsPlaying(true); // Mark as playing
    } else if (speaking) {
      // Stop the speech
      Speech.stop();
      setIsPlaying(false); // Reset the state to not playing
    }

    // Can switch the question text
    // setItem((prevItem) => ({
    //   ...prevItem,
    //   currentQuestionIndex: prevItem.currentQuestionIndex === 0 ? 1 : 0,
    // }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionIconContainer}>
        <IconButton
          icon={isPlaying ? "stop-circle-outline" : "play-circle"}
          color="black"
          size={45}
          onPress={speakHandler}
        />
      </View>
      <View style={styles.questionTextContainer}>
        <Text style={styles.questionText}>{questionText}</Text>
      </View>
    </View>
  );
};

export default HearableQuestions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 15,
    marginBottom: 16,
    width: "90%",
  },
  questionIconContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  questionTextContainer: {
    flex: 7,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingRight: 8,
  },
  questionText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

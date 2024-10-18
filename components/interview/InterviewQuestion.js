import { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppContext } from "../../store/app-context";
import IconButton from "../common/IconButton";
import * as Speech from "expo-speech";

const InterviewQuestion = ({ questionText }) => {
  const { item, setItem } = useContext(AppContext);
  // let questionText = item.interviewQuestions[item.currentQuestionIndex];
  const { currentQuestionIndex, interviewQuestions } = item;
  // let questionText = interviewQuestions[currentQuestionIndex];
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
          icon={isPlaying ? "stop-circle-outline" : "record-voice-over"}
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

export default InterviewQuestion;

const styles = StyleSheet.create({
  container: {
    flex: 1.5,
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#ccc",
    // paddingRight: 4,
    marginBottom: 16,
  },
  questionIconContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  questionTextContainer: {
    flex: 7,
    justifyContent: "center",
    alignItems: "start",
  },
  questionText: {
    fontSize: 20,
  },
});

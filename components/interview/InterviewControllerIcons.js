import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Audio } from "expo-av";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import IconButton from "../common/IconButton";
import VoiceRecordButton from "../interview/VoiceRecordButton";
import InterviewAnswerScript from "./InterviewAnswerScript";
import { transcribeAudio } from "../services/chatgpt/transcribeAudio";
import { analyzeAnswer } from "../services/api";

const InterviewControllerIcons = ({
  currentQuestionIndex,
  interviewQuestions,
  questionText,
  setCurrentQuestionIndex,
  questionAnswerArray,
  setQuestionAnswerArray,
  analyzedAnswer,
  setAnalyzedAnswer,
}) => {
  const navigation = useNavigation();
  const [recording, setRecording] = useState(null);
  const [sound, setSound] = useState(null);
  const [recordingUri, setRecordingUri] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [recordDuration, setRecordDuration] = useState(120);
  const [intervalId, setIntervalId] = useState(0);

  const [transcription, setTranscription] = useState("Transcribing...");

  useEffect(() => {
    // Unload sound when component unmounts or when a new sound is played
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const startRecording = async () => {
    try {
      setTranscription("Transcribing...");
      // Ask for permissions to access the microphone
      await Audio.requestPermissionsAsync();

      // Prepare audio recording settings
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording...");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );

      // Start countdown immediately
      const id = setInterval(() => {
        setRecordDuration((prevDuration) => {
          if (prevDuration > 0) {
            return prevDuration - 1; // Decrement by 1 every second
          } else {
            clearInterval(id); // Stop the interval at 0
            return 0; // Ensure it stays at 0
          }
        });
      }, 1000);
      setIntervalId(id);

      setRecording(recording); // recorded audio file is stored locally
      setIsRecording(true);
      setRecordingUri(null);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    console.log("Stopping recording...");
    setRecording(undefined);
    if (recording) {
      try {
        // Stops the recording and deallocates the recorder from memory
        const status = await recording.stopAndUnloadAsync();
        const uri = recording.getURI(); // Get the URI of the recorded file
        setRecordingUri(uri);
        setIsRecording(false);

        clearInterval(intervalId);
        setRecordDuration(120); // Reset the duration to 2 minutes if stopped

        console.log("Recording stopped and stored at:", uri);
        console.log("Recording status after stopping:", status); // Log the status

        // Get and display transcription from audio uri
        const audioText = await transcribeAudio(uri);
        setTranscription(audioText);
      } catch (error) {
        console.error("Failed to stop recording", error);
      }
    }
  };

  const playSound = async () => {
    if (recordingUri) {
      try {
        console.log("Loading sound...");
        const { sound } = await Audio.Sound.createAsync({ uri: recordingUri });
        setSound(sound);
        setIsPlaying(true);

        console.log("Playing sound...");
        await sound.playAsync();

        // Detect when the sound has finished playing
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            setIsPlaying(false);
          }
        });
      } catch (error) {
        console.error("Error playing sound:", error);
      }
    }
  };

  const nextHandler = async () => {
    if (recordingUri) {
      // Clear the recording URI for the next recording
      setRecordingUri(null);
    }

    // Save the current question and answer transcription to questionAnswerArray
    setQuestionAnswerArray((prevArray) => [
      ...prevArray,
      { question: questionText, answer: transcription },
    ]);
    // Check the updated array
    console.log("Updated questionAnswerArray: ", [
      ...questionAnswerArray,
      { question: questionText, answer: transcription },
    ]);
    // console.log(questionAnswerArray);

    // Proceed to the next question only if recordingUri has been stored
    if (currentQuestionIndex === interviewQuestions.length - 1) {
      // use analyzeAnswer endpoint to pass questionAnswerArray
      const analyzedFeedback = await analyzeAnswer([
        ...questionAnswerArray,
        { question: questionText, answer: transcription },
      ]);

      // if it's the last question, pass sets of questions/answers and get feedback
      setAnalyzedAnswer(analyzedFeedback);

      // If it's the last question, navigate to the feedback screen
      navigation.navigate("InterviewFeedback");
    } else {
      if (currentQuestionIndex < interviewQuestions.length - 1) {
        // Increment the current question index
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }
    }
    console.log(analyzedAnswer);
  };

  const minutes = Math.floor(recordDuration / 60);
  const seconds = (recordDuration % 60).toString().padStart(2, "0");

  let mainContents = recordingUri ? (
    <>
      <InterviewAnswerScript transcription={transcription} />
      <View style={styles.retryContainer}>
        <Text style={styles.pressText}>Press to try again!</Text>
        <View style={styles.retryIconContainer}>
          <IconButton
            icon="refresh"
            color="black"
            size={25}
            onPress={startRecording}
          />
        </View>
      </View>
    </>
  ) : (
    <>
      <Text style={styles.pressText}>
        {isRecording ? `${minutes}:${seconds}` : "Press to answer!"}
      </Text>
      <View style={isRecording ? styles.micStopContainer : styles.micContainer}>
        <IconButton
          icon={isRecording ? "stop-sharp" : "mic"}
          color="black"
          size={isRecording ? 40 : 50}
          onPress={isRecording ? stopRecording : startRecording}
        />
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <View
        style={
          recordingUri ? styles.mainContainerWithScript : styles.mainContainer
        }
      >
        {mainContents}
      </View>
      {/* <VoiceRecordButton /> */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={
            recordingUri ? styles.listenButton : styles.listenButtonDisabled
          }
          disabled={recordingUri ? false : true}
          onPress={playSound}
        >
          <Text style={styles.listenText}>Listen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            recordingUri && transcription && transcription !== "Transcribing..."
              ? styles.nextButton
              : styles.nextButtonDisabled
          }
          disabled={
            recordingUri && transcription && transcription !== "Transcribing..."
              ? false
              : true
          }
          onPress={nextHandler}
        >
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InterviewControllerIcons;

const styles = StyleSheet.create({
  container: {
    flex: 6,
    alignItems: "center",
    width: "90%",
    marginBottom: 6,
    paddingHorizontal: 28,
  },
  mainContainer: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 6,
    marginBottom: 130,
  },
  mainContainerWithScript: {
    flex: Platform.OS === "ios" ? 6.6 : 6.4,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 6,
    marginBottom: 20,
  },
  pressText: {
    fontSize: 15,
    marginBottom: 2,
  },
  retryContainer: {
    justifyContent: "center",
    alignItems: "center",
    rowGap: 8,
  },
  retryIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 50,
    backgroundColor: "#ccc",
    padding: 15,
  },
  micContainer: {
    borderWidth: 12,
    borderColor: "black",
    borderRadius: 100,
    padding: 30,
  },
  micStopContainer: {
    borderWidth: 12,
    borderColor: "black",
    borderRadius: 100,
    padding: 35,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 10,
    width: "100%",
  },
  listenButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 6,
    padding: 10,
    width: "65%",
  },
  listenButtonDisabled: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 6,
    padding: 10,
    width: "65%",
    opacity: 0.3,
  },
  listenText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  nextButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 6,
    padding: 10,
    width: "65%",
  },
  nextButtonDisabled: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 6,
    padding: 10,
    width: "65%",
    opacity: 0.3,
  },
  nextText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

import { useNavigation } from "@react-navigation/native";
import React, { useRef } from "react";
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
import { Colors } from "@/constants/Colors";
import LoadingOverlay from "../common/LoadingOverlay";
import { AppContext } from "@/store/app-context";
import Voice from "@react-native-voice/voice";

const InterviewControllerIcons = ({
  currentQuestionIndex,
  interviewQuestions,
  questionText,
  setCurrentQuestionIndex,
  questionAnswerArray,
  setQuestionAnswerArray,
}) => {
  const { setLoading, analyzedAnswer, setAnalyzedAnswer, fontsLoaded } =
    useContext(AppContext);

  const navigation = useNavigation();
  const [recording, setRecording] = useState(null);
  const [sound, setSound] = useState(null);
  const [recordingUri, setRecordingUri] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [recordDuration, setRecordDuration] = useState(120);
  const [intervalId, setIntervalId] = useState(0);

  const [transcription, setTranscription] = useState("Transcribing...");
  const [transcript, setTranscript] = useState("");
  const [partialTranscript, setPartialTranscript] = useState("");
  const [currentWord, setCurrentWord] = useState("Transcript...");
  const [isLiveTranscribeHidden, setIsLiveTranscribeHidden] = useState(true);
  const voiceRecordButtonRef = useRef();

  const handleSkipRecording = () => {
    if (voiceRecordButtonRef.current) {
      voiceRecordButtonRef.current.stopRecordingSkip(); // Call the child function
    }
  };

  useEffect(() => {
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechPartialResults = (e) => {
    setPartialTranscript(e.value[0]);
    // setCurrentWord(words[words.length - 1]); // Set to the last word spoken
  };

  const onSpeechResults = (e) => {
    // const words = e.value[0].split(" ");
    setTranscript(e.value[0]); // Set to the last word in the final result
  };

  const onSpeechError = (event) => {
    console.error(event.error);
  };

  useEffect(() => {
    // Unload sound when component unmounts or when a new sound is played
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const startRecording = async () => {
    if (isRecording) {
      console.log("Speech recognition already started!");
      return; // Prevent starting again if already active
    }

    try {
      setTranscript("");
      setPartialTranscript("");

      setTranscription("Transcribing...");
      // Ask for permissions to access the microphone
      // await Audio.requestPermissionsAsync();
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        console.error("Microphone permissions not granted.");
        return;
      }

      // Prepare audio recording settings
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording...");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      // start countdown immediately
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

      try {
        await Voice.start("en-US");
      } catch (e) {
        console.error(e);
      }
      setIsLiveTranscribeHidden(false);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
      setIsLiveTranscribeHidden(true);
    }
  };

  const stopRecording = async () => {
    console.log("Stopping recording...");
    if (!isRecording) return; // Prevent stopping if not recording

    setIsRecording(false);
    setIsLiveTranscribeHidden(true);

    // setRecording(undefined);
    if (recording) {
      try {
        // Stops the recording and deallocates the recorder from memory
        const status = await recording.stopAndUnloadAsync();
        const uri = recording.getURI(); // Get the URI of the recorded file
        setRecordingUri(uri);
        // setIsRecording(false);

        clearInterval(intervalId);
        setRecordDuration(120); // Reset the duration to 2 minutes if stopped

        console.log("Recording stopped and stored at:", uri);
        console.log("Recording status after stopping:", status); // Log the status

        // Get and display transcription from audio uri
        const audioText = await transcribeAudio(uri);
        setTranscription(audioText);

        try {
          await Voice.stop();
          setTranscript("");
          setPartialTranscript("");
        } catch (e) {
          console.error(e);
        }
      } catch (error) {
        console.error("Failed to stop recording", error);
      }
    }
  };

  const stopRecordingOnNext = async () => {
    console.log("Stopping recording...");
    if (!isRecording) {
      console.log("it is not recording");
      return;
    } // Prevent stopping if not recording

    setIsRecording(false);

    // setRecording(undefined);
    if (recording) {
      handleSkipRecording();
      console.log("stopRecording on next : Are you recording ?");
      try {
        // Stops the recording and deallocates the recorder from memory
        const status = await recording.stopAndUnloadAsync();

        clearInterval(intervalId);
        setRecordDuration(120); // Reset the duration to 2 minutes if stopped

        try {
          await Voice.stop();
          setTranscript("");
          setPartialTranscript("");
        } catch (e) {
          console.error(e);
        }
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
    //stop recording if it is not stoped || Reset recording
    stopRecordingOnNext();
    //clear the live transcribe

    if (recordingUri) {
      // Clear the recording URI for the next recording
      setRecordingUri(null);
    }

    if (recordingUri && transcription && transcription !== "Transcribing...") {
      setQuestionAnswerArray((prevArray) => [
        ...prevArray,
        { question: questionText, answer: transcription },
      ]);
    } else {
      setQuestionAnswerArray((prevArray) => [
        ...prevArray,
        { question: questionText, answer: "" },
      ]);
    }
    // Save the current question and answer transcription to questionAnswerArray

    // Proceed to the next question only if recordingUri has been stored
    if (currentQuestionIndex === interviewQuestions.length - 1) {
      setLoading(true);
      // if it's the last question, navigate to the feedback screen
      navigation.navigate("InterviewFeedback");
      // use analyzeAnswer endpoint to pass questionAnswerArray and get feedback

      let analyzedFeedback;
      if (
        recordingUri &&
        transcription &&
        transcription !== "Transcribing..."
      ) {
        analyzedFeedback = await analyzeAnswer([
          ...questionAnswerArray,
          { question: questionText, answer: transcription },
        ]);
      } else {
        analyzedFeedback = await analyzeAnswer([
          ...questionAnswerArray,
          { question: questionText, answer: "" },
        ]);
      }

      // if it's the last question, pass sets of questions/answers and get feedback
      setAnalyzedAnswer(analyzedFeedback);
      setLoading(false);

      setTranscript("");
      setPartialTranscript("");
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
        <TouchableOpacity style={styles.retryIconContainer}>
          <IconButton
            icon="refresh"
            color="black"
            size={25}
            onPress={startRecording}
          />
        </TouchableOpacity>
      </View>
    </>
  ) : (
    <>
      <VoiceRecordButton
        ref={voiceRecordButtonRef}
        startRecord={startRecording}
        stopRecord={stopRecording}
        isRecord={isRecording}
        isLiveTranscribeHidden={isLiveTranscribeHidden}
      />

      <View
        style={[
          styles.textOutercontainer,
          { display: isLiveTranscribeHidden ? "none" : "flex" },
        ]}
      >
        <View style={styles.textContainer}>
          <Text style={styles.liveText} numberOfLines={1} ellipsizeMode="head">
            {transcript || partialTranscript}
          </Text>
        </View>
      </View>
      {/* <Text style={styles.text}>Listening: {listening ? "Yes" : "No"}</Text> */}
    </>
  );

  if (!fontsLoaded) {
    return null; // return null if fonts aren't loaded
  }

  return (
    <View style={styles.container}>
      <View
        style={
          recordingUri ? styles.mainContainerWithScript : styles.mainContainer
        }
      >
        {mainContents}
      </View>

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
          // disabled={
          //   recordingUri && transcription && transcription !== "Transcribing..."
          //     ? false
          //     : true
          // }
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
  textOutercontainer: {
    flex: 1,
    // backgroundColor: "#ddd",
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  liveText: {
    // paddingTop: 20,
  },
  container: {
    flex: 5,
    alignItems: "center",
    width: "90%",
    marginBottom: 10,
    paddingHorizontal: 28,
  },
  mainContainer: {
    flex: 8,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 6,
    marginBottom: 100,
    width: "100%",
  },
  mainContainerWithScript: {
    flex: Platform.OS === "ios" ? 6.6 : 6.4,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 6,
    marginBottom: 20,
  },
  pressText: {
    fontSize: 16,
    marginBottom: 2,
    fontFamily: "MavenPro-SemiBold",
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
    borderColor: Colors.disabledBlue,
    borderRadius: 50,
    backgroundColor: Colors.disabledBlue,
    padding: 15,
  },
  micOuterContainer: {
    borderWidth: 18,
    borderColor: "#dee3f4",
    borderRadius: 150,
    marginBottom: 30,
  },
  micContainer: {
    borderWidth: 15,
    borderColor: Colors.successGreen,
    borderRadius: 100,
    padding: 35,
    margin: 10,
    backgroundColor: Colors.disabledBlue,
  },
  micStopContainer: {
    borderWidth: 15,
    borderColor: Colors.defaultRed,
    borderRadius: 100,
    padding: 42.5,
    margin: 10,
    backgroundColor: Colors.disabledBlue,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 10,
    marginTop: 16,
    width: "100%",
  },
  listenButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: Colors.defaultBlue,
    borderRadius: 6,
    padding: 10,
    width: "65%",
  },
  listenButtonDisabled: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: Colors.defaultBlue,
    borderRadius: 6,
    padding: 10,
    width: "65%",
    opacity: 0.3,
  },
  listenText: {
    fontSize: 16,
    fontFamily: "Mulish-ExtraBold",
    color: Colors.defaultBlue,
  },
  nextButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.defaultBlue,
    borderWidth: 2,
    borderColor: Colors.defaultBlue,
    borderRadius: 6,
    padding: 10,
    width: "65%",
  },
  nextButtonDisabled: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.defaultBlue,
    borderWidth: 2,
    borderColor: Colors.defaultBlue,
    borderRadius: 6,
    padding: 10,
    width: "65%",
    opacity: 0.3,
  },
  nextText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Mulish-ExtraBold",
  },
});

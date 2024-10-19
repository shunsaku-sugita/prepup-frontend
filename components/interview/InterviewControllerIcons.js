import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import IconButton from "../common/IconButton";
import VoiceRecordButton from "../interview/VoiceRecordButton";
import InterviewAnswerScript from "./InterviewAnswerScript";

const InterviewControllerIcons = ({
  currentQuestionIndex,
  interviewQuestions,
  setItem,
}) => {
  const navigation = useNavigation();
  const [recording, setRecording] = useState(null);
  const [sound, setSound] = useState(null);
  const [recordingUri, setRecordingUri] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

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
        console.log("Recording stopped and stored at:", uri);
        console.log("Recording status after stopping:", status); // Log the status
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

  const handleNext = () => {
    if (currentQuestionIndex === interviewQuestions.length - 1) {
      // If it's the last question, navigate to the feedback screen
      navigation.navigate("InterviewFeedback");
    } else {
      if (currentQuestionIndex < interviewQuestions.length - 1) {
        setItem((prevState) => ({
          ...prevState,
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
        }));
      }
    }
    setRecordingUri(null);
  };

  let mainContents = recordingUri ? (
    <>
      <InterviewAnswerScript />
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
        {!isRecording ? "Press to Answer!" : null}
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
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={
            recordingUri ? styles.listenButton : styles.listenButtonOpacity
          }
          disabled={recordingUri ? false : true}
          onPress={playSound}
        >
          <Text style={styles.listenText}>Listen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={recordingUri ? styles.nextButton : styles.nextButtonOpacity}
          disabled={recordingUri ? false : true}
          onPress={handleNext}
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
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 6,
    marginBottom: 20,
  },
  pressText: {
    fontSize: 15,
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
    marginTop: 2.5,
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
  listenButtonOpacity: {
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
  nextButtonOpacity: {
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

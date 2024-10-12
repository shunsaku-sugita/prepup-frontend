import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "../common/IconButton";

const InterviewControllerIcons = () => {
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

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text>{recordingUri ? "Play!" : null}</Text>
        <IconButton
          icon="volume-medium-outline"
          color={recordingUri ? "black" : "#aaa"}
          size={35}
          display={recordingUri ? false : true}
          onPress={playSound}
        />
      </View>
      <View style={styles.iconContainer}>
        <Text>{!isRecording ? "Press to answer!" : null}</Text>
        <IconButton
          icon="mic"
          color="black"
          size={50}
          onPress={isRecording ? stopRecording : startRecording}
        />
      </View>
      <View style={styles.iconContainer}>
        <Text></Text>
        <IconButton
          icon="chevron-forward"
          color={recordingUri ? "black" : "#aaa"}
          size={30}
          // display={recordingUri ? false : true}
          onPress={() => {
            navigation.navigate("InterviewFeedback");
          }}
        />
      </View>
    </View>
  );
};

export default InterviewControllerIcons;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginBottom: 6,
    paddingHorizontal: 28,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

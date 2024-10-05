import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { StyleSheet, View } from "react-native";
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
      <View>
        <IconButton
          icon="volume-medium-outline"
          color={recordingUri ? "black" : "#aaa"}
          size={35}
          onPress={playSound}
          recordingUri={recordingUri}
        />
      </View>
      <View>
        <IconButton
          icon="mic"
          color="black"
          size={50}
          onPress={isRecording ? stopRecording : startRecording}
        />
      </View>
      <View>
        <IconButton
          icon="chevron-forward"
          color="black"
          size={30}
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
    justifyContent: "space-around",
    alignItems: "center",
    width: 360,
    marginBottom: 6,
  },
});

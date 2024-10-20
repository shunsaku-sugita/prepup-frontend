import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import Svg, { Circle } from "react-native-svg";
import Ionicons from "@expo/vector-icons/Ionicons";

const CircularProgress = ({ percentage, radius, strokeWidth }) => {
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Svg height={radius * 2} width={radius * 2}>
      <Circle
        stroke="#A79E9E"
        fill="none"
        cx={radius}
        cy={radius}
        r={radius - strokeWidth / 2}
      />
      <Circle
        stroke="black"
        fill="none"
        cx={radius}
        cy={radius}
        r={radius - strokeWidth / 2}
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference}`}
        strokeDashoffset={strokeDashoffset}
        transform={`rotate(-85 ${radius} ${radius})`}
        strokeLinecap="round"
      />
      <View style={styles.containerStyle}>
        <Ionicons name="mic" size={50} color="black" style={styles.image} />
      </View>
    </Svg>
  );
};

const VoiceRecordButton = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordDuration, setRecordDuration] = useState(120);
  const [intervalId, setIntervalId] = useState(0);

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access microphone denied");
        return;
      }

      // Start recording and initialize the duration
      setIsRecording(true);
      // setRecordDuration(120); // Start at 120 seconds

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
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    clearInterval(intervalId);
    setRecordDuration(120); // Reset the duration to 2 minutes if stopped
  };

  const handlePress = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const minutes = Math.floor(recordDuration / 60);
  const seconds = (recordDuration % 60).toString().padStart(2, "0");

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.touchable}>
        <Text style={styles.recordingText}>
          {isRecording ? `${minutes}:${seconds}` : "Press to answer!"}
        </Text>
        <CircularProgress
          key={recordDuration}
          percentage={(recordDuration / 120) * 100}
          radius={72}
          strokeWidth={13}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  touchable: {
    alignItems: "center",
    justifyContent: "center",
  },
  recordingText: {
    fontSize: 15,
    fontWeight: "normal",
    textAlign: "center",
  },
  containerStyle: {
    position: "relative",
    alignCenter: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  image: {
    margin: "auto",
  },
});

export default VoiceRecordButton;

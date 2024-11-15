import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import Svg, { Circle } from 'react-native-svg';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from "@/constants/Colors";

const CircularProgress = ({ percentage, radius, isRecording, onPress }) => {
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const strokeColor = isRecording ? Colors.defaultRed : Colors.successGreen;
  const iconColor = isRecording ? Colors.defaultRed : "black";
  

  

  return (
    <Svg
    viewBox={`0 0 ${radius * 2} ${radius * 2}`}
      width={radius * 2 + 70} // Control size with this directly (e.g., radius * 2 + padding)
      height={radius * 2 + 70}>

      {/* Background Circle */}
      <Circle  
        fill={Colors.disabledBlue} // Use Colors.disabledBlue for background
        cx={radius }
        cy={radius }
        r={radius - strokeWidth / 2}
        strokeWidth={strokeWidth}
      />

      {/* Progress Circle */}
      <Circle
        stroke={strokeColor}
        fill="none"
        cx={radius }
        cy={radius}
        r={radius - strokeWidth / 2}
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference}`}
        strokeDashoffset={strokeDashoffset} // Use the reversed offset
        transform={`rotate(265 ${radius } ${radius})`} // Rotate to make it appear to decrease clockwise
        strokeLinecap="round"
      />
      <View style={styles.containerStyle}>
      <Ionicons name={isRecording ? "stop-sharp" : "mic"} size={45} color={iconColor}
      onPress={onPress}
      style={styles.image} />
      </View>
    </Svg>
  );
};

const VoiceRecordButton = ({startRecord, stopRecord, isRecord}) => {
  const [isRecording, setIsRecording] = useState(isRecord);
  const [recordDuration, setRecordDuration] = useState(120);
  const [intervalId, setIntervalId] = useState(0);

  useEffect(() => {
    if (isRecord) {
      startAnimation()
    // console.log("hello")
    // setIsRecording(true)
    }
    }, [isRecord])

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access microphone denied');
        return;
      }
     
      startRecord()
      startAnimation()
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const startAnimation = async () => {
    try {
    
      // Start recording and initialize the duration
      setIsRecording(true);
      setRecordDuration(120); // Start at 120 seconds

      // Start countdown immediately
      const id = setInterval(() => {
        setRecordDuration((prevDuration) => {
          if (prevDuration > 0) {
            return prevDuration - 1; // Decrement by 1 every second
          } else {
            clearInterval(id); // Stop the interval at 0
            setIsRecording(false);
            return 0; // Ensure it stays at 0
          }
        });
      }, 1000);

      setIntervalId(id);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = () => {
    stopRecord()
    setIsRecording(false);
    clearInterval(intervalId);
    setIntervalId(null);
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
  const seconds = (recordDuration % 60).toString().padStart(2, '0');

  return (
    <View style={styles.container}>
    <Text style={styles.pressText}>{isRecording ? `${minutes}:${seconds}` : 'Press to answer!'}</Text>
    <View style={styles.micOuterContainer}>
      <TouchableOpacity onPress={handlePress} style={styles.touchable}>
        <CircularProgress
          key={recordDuration}
          percentage={isRecording ? (120 - recordDuration / 120) * 100 : 100}
          radius={45}
          strokeWidth={8}
          isRecording={isRecording}
          onPress={handlePress}
        />
      </TouchableOpacity>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  micOuterContainer: {
    borderWidth: 18,
    borderColor: "#dee3f4",
    borderRadius: 150,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10, // Add some padding if needed to create space around the circular progress
  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressText: {
    fontSize: 16,
    marginBottom: 2,
    fontFamily: "MavenPro-SemiBold",
  },
  containerStyle: {
    position: 'relative',
    alignCenter: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',

  },
  image: {
    margin: 'auto',
  },
});

export default VoiceRecordButton;

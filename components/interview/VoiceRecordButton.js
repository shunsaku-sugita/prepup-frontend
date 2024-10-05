import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import Svg, { Circle } from 'react-native-svg';
import Ionicons from '@expo/vector-icons/Ionicons';

// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
// import { faMicrophone } from '@fortawesome/free-solid-svg-icons/faMicrophone'

const CircularProgress = ({ percentage, radius, strokeWidth }) => {
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Svg height={radius * 2} width={radius * 2}>

<Circle
        stroke="gray"
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
        strokeDasharray={`${circumference}, ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
      />
      
       <View style={styles.containerStyle}> 
       <Ionicons name="mic" 
       size={45} 
       color="black"
       style={styles.image} />

        {/* <FontAwesomeIcon size={45} style={styles.image} icon={faMicrophone} /> */}
       </View>
      
    </Svg>
  );
};

const VoiceRecordButton = () => {
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordDuration, setRecordDuration] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access microphone denied');
        return;
      }

    //   const newRecording = new Audio.Recording();
    //   await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
    //   await newRecording.startAsync(); 
    //   setRecording(newRecording);
      setIsRecording(true);
      
      // Start a timer for duration
      const id = setInterval(() => {
        setRecordDuration(prev => Math.min(prev + 1, 100)); // Limit to 100% for progress
      }, 1000);
      setIntervalId(id);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    clearInterval(intervalId);
    if (recording) {
    //   await recording.stopAndUnloadAsync();
      setRecording(null);
      setRecordDuration(0);
    }
  };

  const handlePress = () => {
    if (isRecording) {
      stopRecording();
      setRecordDuration(0);
    } else {
      startRecording();
    }
  };

  const totalSeconds = Math.floor(recordDuration * 1.2);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>

      <Text style={styles.recordingText}>{isRecording ? `${minutes}:${seconds}` : 'Press to answer!'}</Text>
        <CircularProgress
          percentage={recordDuration} // use recordDuration to show progress
          radius={50}
          strokeWidth={10} 
        />  
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position:'relative',
    // padding: 20,
    
  },
  recordingText: {
    fontSize: 15,
    fontWeight: 'normal',
    textAlign:'center',
   
  },
  containerStyle:{
    position: 'relative',
    alignCenter: 'center',
    justifyContent:'center',
    height:'100%',
    width: '100%',
  },
  image: {
    // position: 'absolute',
    // alignCenter: 'center',
    // justifyContent:'center',
   margin:'auto'
  },
  
});

export default VoiceRecordButton;

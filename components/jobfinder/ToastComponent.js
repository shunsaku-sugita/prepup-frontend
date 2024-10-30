import React from 'react';
import Toast, { BaseToast } from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from 'react-native';

// Custom Toast Component for General Use
const ToastComponent = ({ text1, text2, hide }) => {
  return (
    <View style={styles.toastContainer}>
      <View style={styles.textContainer}>
        {/* Ensure text1 and text2 are rendered correctly within <Text> components */}
        {text1 ? <Text style={styles.toastText}>{text1}</Text> : null}
        {text2 ? <Text style={styles.toastText}>{text2}</Text> : null}
      </View>
      <TouchableOpacity onPress={hide} style={styles.closeButton}>
        <Ionicons name="close" size={18} color="white" />
      </TouchableOpacity>
    </View>
  );
};

// Toast Configuration for General Use
const toastConfig = {
  info: (props) => (
    <ToastComponent
      {...props}
      hide={() => Toast.hide()}
    />
  ),
  success: (props) => (
    <ToastComponent
      {...props}
      hide={() => Toast.hide()}
    />
  ),
  error: (props) => (
    <ToastComponent
      {...props}
      hide={() => Toast.hide()}
    />
  ),
};

// Styles for the custom toast
const styles = {
  toastContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'green', 
   
  },
  textContainer: {
    flex: 1,
  },
  toastText: {
    color: 'white', // General text color
    fontSize: 14,
  },
  closeButton: {
    marginLeft: 10,
    padding: 4,
  },
};

export { toastConfig };

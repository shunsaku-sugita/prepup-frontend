import React from 'react';
import Toast from 'react-native-toast-message';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from 'react-native';


// Custom Toast Component for General Use
const ToastComponent = ({ text1, text2, hide, type }) => {
  const backgroundColor = type === 'success' ? '#4CAF50' : type === 'error' ? 'red' : 'red';

  return (
    <View style={[styles.toastContainer, { backgroundColor }]}>
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
      hide={() => Toast.hide()} // Ensure the hide function is correctly implemented
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
    padding: 26,
    borderRadius: 8,
    marginTop:-50,
    backgroundColor: '#4CAF50', 
    shadowColor: 'black', 
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0, 
    elevation: 10, 
    zIndex: 100, 
  },
  textContainer: {
    flex: 1,
  },
  toastText: {
    color: 'white', 
    fontSize: 16,
    fontWeight: '600',

  },
  closeButton: {
    marginLeft: 10,
    padding: 4,
  },
};

export { toastConfig };

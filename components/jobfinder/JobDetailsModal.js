import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import React from "react";
import TitleText from "../common/TitleText"; 
import WideButton from "../common/WideButton"; 
import { Ionicons } from "@expo/vector-icons";

const JobDetailsModal = ({ job, setModalVisible, navigation }) => {
    
    if (!job) {
      return null; 
    }
  
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.closeIcon}>
            <Ionicons
              name="close"
              color="black"
              size={28}
              onPress={() => setModalVisible(false)}
            />
          </View>
          <View style={styles.titleWrapper}>
            <TitleText text={job.title} />
          </View>
          <Text style={styles.descriptionText}>{job.description}</Text>
          <View style={styles.buttonContainer}>
            <WideButton
              title="Practice Interview"
              color="white"
              size={24}
            onPress={() => {
                // First close the modal
                setModalVisible(false);
                // Then navigate to InterviewSimulator screen
                navigation.navigate("InterviewSimulator");
              }}
            />
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply Job</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.linkText}></View>
        </View>
      </View>
    );
  };
  

export default JobDetailsModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 30,
  },
  innerContainer: {
    width: '100%', // Full width of the screen
    height: '60%', // Only 60% of the screen height
    backgroundColor: "#fff", // Solid white background for the modal content
    borderTopLeftRadius: 20, // Rounded corners for top-left
    borderTopRightRadius: 20, // Rounded corners for top-right
    padding: 20,
    justifyContent: "center", 
  },
  closeIcon: {
    alignItems: "flex-end",
  },
  titleWrapper: {
    marginBottom: 8,
    alignItems: "center",
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'column', // Arrange buttons vertically
    alignItems: 'center', // Center the buttons
    marginTop: 20,
  },
  applyButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 6,
    // backgroundColor: "green",
    width: '100%', // Full width for the apply button
    alignItems: 'center',
  },
  applyButtonText: {
    color: 'black',
    fontSize: 18,
  },
  linkText: {
    alignItems: "center",
    marginTop: 20,
  },
});

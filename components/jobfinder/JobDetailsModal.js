import { StyleSheet, Text, TextInput, View, TouchableOpacity, Modal } from "react-native";
import React  from "react";
import TitleText from "../common/TitleText"; 
import WideButton from "../common/WideButton"; 
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import { useState } from "react";

const JobDetailsModal = ({ job, setModalVisible, navigation }) => {
    const [webViewVisible, setWebViewVisible] = useState(false);
    if (!job) {
      return null; 
    }

    // Function to handle applying to the job
    const handleApplyPress = () => {
        setWebViewVisible(true); // Open the WebView when Apply is pressed
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.closeIcon}>
            <Ionicons
              name="close"
              color="black"
              marginTop="0"
              size={28}
              onPress={() => setModalVisible(false)}
            />
          </View>
          <View style={styles.titleWrapper}>
            <TitleText text={job.title} />
          </View>
          <Text style={styles.companyDescriptionText}>Company: {job.company}</Text>
          <Text style={styles.descriptionText}>Description:</Text>
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
            <TouchableOpacity style={styles.applyButton} onPress={handleApplyPress}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.linkText}></View>
        </View>

 {/* Modal for WebView */}
 <Modal
                visible={webViewVisible}
                animationType="slide"
                onRequestClose={() => setWebViewVisible(false)}
                transparent={false}
            >
                <View style={{ flex: 1 }}>
                    <WebView 
                        source={{ uri: job.url }} 
                        style={{ flex: 1 }} 
                    />
                    <TouchableOpacity onPress={() => setWebViewVisible(false)} style={styles.closeWebView}>
                        <Text style={styles.closeWebViewText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

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
  },
  innerContainer: {
    width: '100%', 
    height: '60%', 
    backgroundColor: "#fff", 
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20, 
    
    justifyContent: "flex-start", 
  },
  closeIcon: {
    alignItems: "flex-end",
    marginBottom: 10,
    
  },
  titleWrapper: {
    marginBottom: 8,
    alignItems: "left",
  },
  companyDescriptionText: {
    fontSize: 16,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
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
  closeWebView: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    elevation: 5,
},
closeWebViewText: {
    color: "black",
    fontSize: 16,
},
});

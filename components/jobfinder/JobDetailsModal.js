import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import TitleText from "../common/TitleText";
import WideButton from "../common/WideButton";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import { generateQuestionByJobDescription } from "../services/api";
import { socket } from "../services/socket";
import { AppContext } from "@/store/app-context";

const JobDetailsModal = ({ job, setModalVisible, navigation }) => {
  const [webViewVisible, setWebViewVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progressUpdate, setProgressUpdate] = useState(null);
  const [trackingId, setTrackingId] = useState(null); // NEW state for tracking ID
  const { setSelectedCategoryQuestions } = useContext(AppContext);
  console.log("Job object received:", job);

  if (!job) {
    return null;
  }

  // Function to handle opening the job application page
  const handleApplyPress = () => {
    setWebViewVisible(true); // Open the WebView when Apply is pressed
  };

  // Handle the "Practice Interview" button press
  const handlePracticeInterview = async () => {
    setLoading(true); // Show loading indicator
    try {
      const adzunaJobId = job.jobId;
      if (!adzunaJobId) {
        throw new Error("Missing job ID");
      }
      const response = await generateQuestionByJobDescription(
        adzunaJobId,
        setProgressUpdate
      );

      console.log("API Response in handlePracticeInterview:", response);

      // Store the received tracking ID in state
      if (response && response.trackingId) {
        setTrackingId(response.trackingId);
      } else {
        throw new Error("No tracking ID received");
      }
    } catch (error) {
      console.error("Error generating interview questions:", error);
      // Optionally show a toast or alert to the user
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to start practice interview. Please try again.",
        position: "top",
        visibilityTime: 2000,
      });
      setLoading(false); // Hide loading indicator after the request
    }
  };

  // Setup socket connection and listen for updates
  useEffect(() => {
    // Connect to the socket if not connected
    if (!socket.connected) {
      socket.connect();
    }

    // Check if there is an active tracking ID and set up listeners
    if (trackingId && job) {
      const currentJobId = job.jobId;
      // Set up a socket listener for the progress update
      socket.on(trackingId, (data) => {
        console.log(`Job Status Update for ${currentJobId}:`, data);

        // Update the progress state with the latest data
        setProgressUpdate(data);

        // Once the job status is completed, navigate to the InterviewSimulator screen
        if (data.status === "Job processing complete!" && data.data) {
          setLoading(false);
          setSelectedCategoryQuestions(data.data);
          setModalVisible(false); // Close the modal
          navigation.navigate("InterviewSimulator", {
            questions: data.data, // Pass the questions received from the server
          });
        }
      });
    }

    // Cleanup function to remove socket listeners when the component unmounts
    return () => {
      if (trackingId) {
        socket.off(trackingId);
      }
    };
  }, [trackingId, job, setProgressUpdate, setSelectedCategoryQuestions]);

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
        <Text style={styles.companyDescriptionText}>
          Company: {job.company}
        </Text>
        <Text style={styles.descriptionText}>Description:</Text>
        <Text style={styles.descriptionText}>{job.description}</Text>
        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#4D63B5" />
          ) : (
            <WideButton
              title="Practice Interview"
              color="white"
              size={24}
              onPress={handlePracticeInterview} // Start generating questions
            />
          )}
          <TouchableOpacity
            style={styles.applyButton}
            onPress={handleApplyPress}
          >
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>

        {/* Modal for WebView */}
        <Modal
          visible={webViewVisible}
          animationType="slide"
          onRequestClose={() => setWebViewVisible(false)}
          transparent={false}
        >
          <View style={{ flex: 1 }}>
            <WebView source={{ uri: job.url }} style={{ flex: 1 }} />
            <TouchableOpacity
              onPress={() => setWebViewVisible(false)}
              style={styles.closeWebView}
            >
              <Text style={styles.closeWebViewText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
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
  },
  innerContainer: {
    width: "100%",
    height: "60%",
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
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
  },
  applyButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 6,
    width: "100%",
    alignItems: "center",
  },
  applyButtonText: {
    color: "black",
    fontSize: 18,
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

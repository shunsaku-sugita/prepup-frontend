import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  SafeAreaView
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
  const [trackingId, setTrackingId] = useState(null);
  const {
    progressUpdate,
    setProgressUpdate,
    setSelectedCategoryQuestions,
    setCurrentQuestionIndex,
  } = useContext(AppContext);
  
  if (!job) {
    return null;
  }

  const handleApplyPress = () => {
    setWebViewVisible(true);
  };

  const handlePracticeInterview = async () => {
    setLoading(true);
    try {
      const adzunaJobId = job.jobId;
      if (!adzunaJobId) {
        throw new Error("Missing job ID");
      }
      const response = await generateQuestionByJobDescription(
        adzunaJobId,
        setProgressUpdate
      );

      setCurrentQuestionIndex(0);

      if (response && response.trackingId) {
        setTrackingId(response.trackingId);
      } else {
        throw new Error("No tracking ID received");
      }
    } catch (error) {
      console.error("Error generating interview questions:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to start practice interview. Please try again.",
        position: "top",
        visibilityTime: 2000,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    if (trackingId && job) {
      const currentJobId = job.jobId;
      socket.on(trackingId, (data) => {
        setProgressUpdate(data);

        if (data.status === "Job processing complete!" && data.data) {
          setLoading(false);
          setSelectedCategoryQuestions(data.data);
          setModalVisible(false);
          navigation.navigate("InterviewSimulator", {
            questions: data.data,
          });
        }
      });
    }

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
        <Text style={styles.companyLabel}>
          Company: <Text style={styles.companyValue}>{job.company}</Text>
        </Text>
        <Text style={styles.descriptionLabel}>Description</Text>
        <Text style={styles.descriptionValue}>{job.description}</Text>
        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#4D63B5" />
          ) : (
            <WideButton
              title="Practice Interview"
              color="white"
              size={24}
              onPress={handlePracticeInterview}
            />
          )}
          <TouchableOpacity
            style={styles.applyButton}
            onPress={handleApplyPress}
          >
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>

        <Modal
          visible={webViewVisible}
          animationType="slide"
          onRequestClose={() => setWebViewVisible(false)}
          transparent={false}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <WebView source={{ uri: job.url }} style={{ flex: 1 }} />
            <TouchableOpacity
              onPress={() => setWebViewVisible(false)}
              style={styles.closeWebView}
            >
              <Text style={styles.closeWebViewText}>Close</Text>
            </TouchableOpacity>
          </SafeAreaView>
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
  companyLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  companyValue: {
    fontSize: 16,
    fontWeight: "normal", // Regular weight for the company value
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: "bold", // Bold for "Description"
   
  },
  descriptionValue: {
    fontSize: 16,
    fontWeight: "normal", // Regular weight for the description value
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

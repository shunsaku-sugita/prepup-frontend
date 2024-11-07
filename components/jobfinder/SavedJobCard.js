import { StyleSheet, View, FlatList, Modal } from "react-native";
import React from "react";
import Toast from "react-native-toast-message";
import JobCard from "./JobCard";
import JobDetailsModal from "./JobDetailsModal";
import { useNavigation } from "@react-navigation/native";

const SavedJobCard = ({ data, toggleBookmark }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedJob, setSelectedJob] = React.useState(null);

  const navigation = useNavigation();

  const handleBookmarkToggle = (job) => {
    toggleBookmark(job);

    if (job.isSaved) {
      Toast.show({
        type: "info",
        text1: "Removed from Saved Jobs",
        text2: `${job.title} has been removed from your saved jobs.`,
        position: "top",
        visibilityTime: 1500,
      });
    }
  };

  const handleJobPress = (job) => {
    setSelectedJob(job);
    setModalVisible(true);
  };

  return (
    <View style={styles.jobListSaved}>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id || item.id || item.jobId} // Ensure a unique key exists
        renderItem={({ item }) => (
          <JobCard
            key={item._id || item.id || item.jobId} // Use the same unique identifier
            job={{ ...item, isSaved: true }}
            toggleBookmark={toggleBookmark}
            onPress={() => handleJobPress(item)}
          />
        )}
        numColumns={1}
        contentContainerStyle={styles.listContent}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.innerContainer}>
            {selectedJob && (
              <JobDetailsModal
                job={selectedJob}
                setModalVisible={setModalVisible}
                navigation={navigation}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SavedJobCard;

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 16,
  },
  jobListSaved: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  innerContainer: {
    width: "100%",
    height: "80%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    justifyContent: "center",
  },
});

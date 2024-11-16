import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useContext, useMemo } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import JobFilterBar from "./JobFilterBar";
import SavedJobCard from "./SavedJobCard";
import JobFilterLocationItem from "./JobFilterLocationItem";
import JobSearchBar from "./JobSearchBar";
import JobDetailsModal from "./JobDetailsModal";
import {
  bookmarkJob,
  unbookmarkJob,
  fetchSavedJobs,
  fetchJobs,
  fetchJobsByKeyword,
} from "../services/api";
import Toast from "react-native-toast-message";
import { Colors } from "@/constants/Colors";
import LoadingOverlay from "../common/LoadingOverlay";
import { AppContext } from "@/store/app-context";

const jobListOutput = () => {
  const { fontsLoaded } = useContext(AppContext);
  const navigation = useNavigation();

  const [filterType, setFilterType] = useState(1);
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const getSavedJobs = async () => {
    try {
      const response = await fetchSavedJobs();
      setSavedJobs(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Error fetching saved jobs:", error);
      Toast.show({ type: "error", text1: "Failed to fetch saved jobs." });
    }
  };

  const fetchAndUpdateJobs = async (page = 1) => {
    setIsLoading(true);
    try {
      const fetchedJobs = searchQuery
        ? await fetchJobsByKeyword(page, searchQuery)
        : await fetchJobs(page);

      const updatedJobs = fetchedJobs.map((job) => ({
        ...job,
        isSaved: savedJobs.some((savedJob) => savedJob.jobId === job.jobId),
      }));

      setJobs((prevJobs) =>
        page === 1 ? updatedJobs : [...prevJobs, ...updatedJobs]
      );
    } catch (error) {
      console.error("Error fetching jobs:", error);
      Toast.show({ type: "error", text1: "Failed to load jobs." });
    } finally {
      setIsLoading(false);
      if (initialLoading) setInitialLoading(false);
    }
  };

  const loadJobsAndSavedJobs = async () => {
    await getSavedJobs();
    await fetchAndUpdateJobs();
  };

  useFocusEffect(
    React.useCallback(() => {
      if (initialLoading) {
        loadJobsAndSavedJobs();
      } else {
        fetchAndUpdateJobs();
      }
    }, [searchQuery, savedJobs])
  );

  const loadMoreJobs = async () => {
    if (isLoading) return;
    await fetchAndUpdateJobs(page + 1);
    setPage((prevPage) => prevPage + 1);
  };

  const toggleBookmark = async (job) => {
    const isSaved = savedJobs.some((savedJob) => savedJob.jobId === job.jobId);

    try {
      const updatedSavedJobs = isSaved
        ? savedJobs.filter((savedJob) => savedJob.jobId !== job.jobId)
        : [...savedJobs, job];

      setSavedJobs(updatedSavedJobs);

      await (isSaved ? unbookmarkJob(job.jobId) : bookmarkJob(job));

      setJobs((prevJobs) =>
        prevJobs.map((item) =>
          item.jobId === job.jobId ? { ...item, isSaved: !isSaved } : item
        )
      );

      Toast.show({
        type: "success",
        text1: isSaved
          ? "Removed from saved jobs"
          : "Added to saved jobs",
      });
    } catch (error) {
      console.error("Error updating bookmark:", error);
      Toast.show({
        type: "error",
        text1: "Failed to update bookmark. Please try again.",
      });
    }
  };

  const handleJobPress = (job) => {
    setSelectedJob(job);
    setModalVisible(true);
  };

  const filteredJobs = useMemo(
    () =>
      jobs.map((job) => ({
        ...job,
        isSaved: savedJobs.some((savedJob) => savedJob.jobId === job.jobId),
      })),
    [jobs, savedJobs]
  );

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1 }}>
      {initialLoading && <LoadingOverlay />}

      {!initialLoading && (
        <>
          <JobSearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterType={filterType}
            setFilterType={setFilterType}
          />
          <JobFilterBar
            filterType={filterType}
            changeFilter={setFilterType}
          />

          {filterType === 0 ? (
            savedJobs.length === 0 ? (
              <Text style={styles.noSavedJobsText}>You have no saved jobs.</Text>
            ) : (
              <SavedJobCard data={savedJobs} toggleBookmark={toggleBookmark} />
            )
          ) : (
            <View style={styles.container}>
              <JobFilterLocationItem
                data={filteredJobs}
                toggleBookmark={toggleBookmark}
                handleJobPress={handleJobPress}
              />
              <TouchableOpacity
                style={styles.loadMoreButton}
                onPress={loadMoreJobs}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.loadMoreButtonText}>Load More</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.innerContainer}>
            <JobDetailsModal
              job={selectedJob}
              setModalVisible={setModalVisible}
              navigation={navigation}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default jobListOutput;

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
  },
  loadMoreButton: {
    backgroundColor: Colors.defaultBlue,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    alignSelf: "center",
    width: "100%",
  },
  loadMoreButtonText: {
    color: "#FEFEFF",
    fontSize: 16,
    fontFamily: "Mulish-ExtraBold",
  },
  noSavedJobsText: {
    fontSize: 16,
    color: Colors.backgroundDarkGray,
    textAlign: "center",
    marginTop: 20,
  },
});

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

  const [filterType, setFilterType] = useState(1); // 1: All jobs, 0: Saved jobs
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true); // Track if there are more jobs to load
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const getSavedJobs = async () => {
    try {
      const response = await fetchSavedJobs();
      console.log("Saved Jobs Response:", response);
      setSavedJobs(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Error fetching saved jobs:", error);
      Toast.show({ type: "error", text1: "Failed to fetch saved jobs." });
    }
  };

  const fetchAndUpdateJobs = async (currentPage) => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    try {
      const fetchedJobs = searchQuery
        ? await fetchJobsByKeyword(currentPage, searchQuery)
        : await fetchJobs(currentPage);

      console.log("Fetched Jobs:", fetchedJobs);

      if (fetchedJobs.length === 0) {
        setHasMore(false); // No more jobs to load
      } else {
        const updatedJobs = fetchedJobs.map((job) => ({
          ...job,
          isSaved: savedJobs.some((savedJob) => savedJob.jobId === job.jobId),
        }));

        setJobs((prevJobs) => [...prevJobs, ...updatedJobs]);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      Toast.show({ type: "error", text1: "Failed to load jobs." });
    } finally {
      setIsLoading(false);
      setInitialLoading(false);
    }
  };

  const loadJobsAndSavedJobs = async () => {
    await getSavedJobs();
    setJobs([]);
    setPage(1);
    setHasMore(true); // Reset pagination
    await fetchAndUpdateJobs(1);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadJobsAndSavedJobs();
    }, [searchQuery])
  );

  const loadMoreJobs = async () => {
    const nextPage = page + 1;
    await fetchAndUpdateJobs(nextPage);
    setPage(nextPage);
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
        text1: isSaved ? "Removed from saved jobs" : "Added to saved jobs",
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
          <JobFilterBar filterType={filterType} changeFilter={setFilterType} />

          {filterType === 0 ? (
            savedJobs.length === 0 ? (
              <Text style={styles.noSavedJobsText}>
                You have no saved jobs.
              </Text>
            ) : (
              <SavedJobCard data={savedJobs} toggleBookmark={toggleBookmark} />
            )
          ) : (
            <View style={styles.container}>
              {filteredJobs.length === 0 ? (
                <Text style={styles.noJobsText}>No jobs found.</Text>
              ) : (
                <JobFilterLocationItem
                  data={filteredJobs}
                  toggleBookmark={toggleBookmark}
                  handleJobPress={handleJobPress}
                />
              )}
              {hasMore && (
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
              )}
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
  noJobsText: {
    fontSize: 16,
    color: Colors.backgroundDarkGray,
    textAlign: "center",
    marginTop: 20,
  },
});

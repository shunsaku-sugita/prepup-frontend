import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
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
  if (!fontsLoaded) {
    return null; // return null if fonts aren't loaded
  }
  const [filterType, setFilterType] = useState(1);
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // Set initial loading to true
  const [isBookmarking, setIsBookmarking] = useState(false);
  const [page, setPage] = useState(1);
  const [savedJobs, setSavedJobs] = useState([]);
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const navigation = useNavigation();

  const getSavedJobs = async () => {
    try {
      const savedJobsResponse = await fetchSavedJobs();
      if (Array.isArray(savedJobsResponse)) {
        setSavedJobs(savedJobsResponse);
      } else {
        setSavedJobs([]);
      }
    } catch (error) {
      console.error("Error fetching saved jobs:", error);
    }
  };

  const fetchJobsByKeywordEffect = async (page = 1) => {
    setIsLoading(true);
    setError("");

    try {
      let fetchedJobs = [];
      if (!searchQuery) {
        fetchedJobs = await fetchJobs(page);
      } else {
        fetchedJobs = await fetchJobsByKeyword(page, searchQuery);
      }

      // Update fetched jobs with saved status
      const updatedFetchedJobs = fetchedJobs.map((job) => {
        const isSaved = savedJobs.some(
          (savedJob) => savedJob.jobId === job.jobId
        );
        return { ...job, isSaved };
      });
      setJobs(updatedFetchedJobs);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadJobsAndSavedJobs = async () => {
    await getSavedJobs();
    fetchJobsByKeywordEffect();
  };

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      loadJobsAndSavedJobs();
    }, [searchQuery, filterType])
  );

  const loadMoreJobs = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const newJobs = await fetchJobs(nextPage);

      if (newJobs.length > 0) {
        const uniqueNewJobs = newJobs.filter(
          (newJob) => !jobs.some((job) => job.jobId === newJob.jobId)
        );

        if (uniqueNewJobs.length > 0) {
          const updatedNewJobs = uniqueNewJobs.map((job) => {
            const isSaved = savedJobs.some(
              (savedJob) => savedJob.jobId === job.jobId
            );
            return { ...job, isSaved };
          });
          setJobs((prevJobs) => [...prevJobs, ...updatedNewJobs]);
          setPage(nextPage);
        }
        if (uniqueNewJobs.length < 10) {
          console.warn(
            `Expected 10 jobs, but received ${uniqueNewJobs.length} jobs.`
          );
        }
      }
    } catch (error) {
      console.error("Error loading more jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleBookmark = async (job) => {
    const jobId = job.jobId;
    const jobDetails = {
      jobId: job.jobId,
      title: job.title,
      company: job.company,
      companyInitial: job.companyInitial,
      description: job.description,
      createdDate: job.createdDate,
      url: job.url,
    };

    const isAlreadySaved = savedJobs.some(
      (savedJob) => savedJob.jobId === jobId
    );

    try {
      setIsBookmarking(true);

      if (isAlreadySaved) {
        await unbookmarkJob(jobId);
        setSavedJobs((prevSavedJobs) =>
          prevSavedJobs.filter((savedJob) => savedJob.jobId !== jobId)
        );

        setJobs((prevJobs) =>
          prevJobs.map((item) =>
            item.jobId === jobId ? { ...item, isSaved: false } : item
          )
        );

        Toast.show({
          type: "success",
          text1: "Job removed from saved jobs",
          text2: "",
          position: "top",
          autoHide: true,
          visibilityTime: 3000,
        });
      } else {
        await bookmarkJob(jobDetails);
        setSavedJobs((prevSavedJobs) => [...prevSavedJobs, jobDetails]);

        setJobs((prevJobs) =>
          prevJobs.map((item) =>
            item.jobId === jobId ? { ...item, isSaved: true } : item
          )
        );

        Toast.show({
          type: "success",
          text1: "Job added to saved jobs",
          text2: "",
          position: "top",
          autoHide: true,
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      console.error("Error updating bookmark:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }

      const rollbackJobs = jobs.map((item) =>
        item.jobId === jobId ? { ...item, isSaved: isAlreadySaved } : item
      );
      setJobs(rollbackJobs);
    } finally {
      setIsBookmarking(false);
    }
  };

  const handleJobPress = (job) => {
    setSelectedJob(job);
    setModalVisible(true);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Show LoadingOverlay until jobs are fetched */}
      {isLoading && <LoadingOverlay />}

      {/* Only show the content once the jobs are loaded */}
      {!isLoading && (
        <>
          <JobSearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <JobFilterBar
            filterType={filterType}
            changeFilter={(type) => setFilterType(type)}
          />

          {filterType === 0 ? (
            <SavedJobCard
              data={savedJobs.filter((job) => job.title.toLowerCase())}
              toggleBookmark={toggleBookmark}
            />
          ) : (
            <View style={styles.container}>
              <JobFilterLocationItem
                data={jobs.filter((job) => job.title.toLowerCase())}
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

      {/* Move Toast to the bottom of the component tree */}
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
});

import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import JobFilterBar from "./JobFilterBar";
import SavedJobCard from "./SavedJobCard";
import JobFilterLocationItem from "./JobFilterLocationItem";
import JobSearchBar from "./JobSearchBar";
import Toast from 'react-native-toast-message';
import JobFilterTags from './JobFilterTags';
import JobDetailsModal from "./JobDetailsModal";
import {
  bookmarkJob,
  unbookmarkJob,
  fetchSavedJobs,
  fetchJobs,
  fetchJobsByKeyword,
} from '../services/api';
import JobCard from "./JobCard";

const jobListOutput = () => {
  const [filterType, setFilterType] = useState(1);
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isBookmarking, setIsBookmarking] = useState(false);
  const [page, setPage] = useState(1);
  const [savedJobs, setSavedJobs] = useState([]);
  const [error, setError] = useState("");

  // State for active filter tag
  // const [activeFilter, setActiveFilter] = useState(null);

  // State for job details modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Use navigation hook
  const navigation = useNavigation();

  // Fetch saved jobs from API
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

  // Fetch jobs by keyword or all jobs based on search query
  const fetchJobsByKeywordEffect = async (page = 1) => {
    setIsLoading(true);
    setError("");

    try {
      let fetchedJobs = [];
      if (!searchQuery) {
        // If searchQuery is empty, fetch all jobs
        fetchedJobs = await fetchJobs(page);
      } else {
        // If there's a search query, fetch filtered jobs
        fetchedJobs = await fetchJobsByKeyword(page, searchQuery);
      }

      // Check if each job is saved and add the `isSaved` flag accordingly
      const updatedFetchedJobs = fetchedJobs.map((job) => {
        const isSaved = savedJobs.some((savedJob) => savedJob.jobId === job.jobId);
        return { ...job, isSaved };
      });

     
        setJobs(updatedFetchedJobs); // Replace with new results if it's the first 
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setIsLoading(false);
    }
  };

   // Ensure savedJobs are fetched before jobs to maintain synchronization
   const loadJobsAndSavedJobs = async () => {
    await getSavedJobs();
    fetchJobsByKeywordEffect();
  };

  // Load jobs and saved jobs when the component is focused
  useFocusEffect(
    React.useCallback(() => {
      loadJobsAndSavedJobs();
    }, [searchQuery, filterType])
  );

  // Load more jobs for pagination
  const loadMoreJobs = async () => {
    if (isLoading) return; // Prevent multiple requests
    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const newJobs = await fetchJobs(nextPage);

      if (newJobs.length > 0) {
        const uniqueNewJobs = newJobs.filter(
          (newJob) => !jobs.some((job) => job.jobId === newJob.jobId)
        );
        const updatedNewJobs = uniqueNewJobs.map((job) => {
          const isSaved = savedJobs.some((savedJob) => savedJob.jobId === job.jobId);
          return { ...job, isSaved };
        });
        setJobs((prevJobs) => [...prevJobs, ...updatedNewJobs]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Error loading more jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle Bookmark
  const toggleBookmark = async (job) => {
    const jobId = job.jobId;

    // Prepare jobDetails for bookmarking
    const jobDetails = {
      jobId: job.jobId,
      title: job.title,
      company: job.company,
      companyInitial: job.companyInitial,
      description: job.description,
      createdDate: job.createdDate,
      url: job.url,
    };

    console.log("Attempting to toggle bookmark for job:", jobDetails);

    // Check if the job is already saved in `savedJobs`
    const isAlreadySaved = savedJobs.some((savedJob) => savedJob.jobId === jobId);
    console.log("Is job already saved:", isAlreadySaved);

    try {
      setIsBookmarking(true);

      if (isAlreadySaved) {
        // Unbookmark the job
        console.log("Unbookmarking job with jobId:", jobId);
        await unbookmarkJob(jobId);

        // If successful, remove the job from savedJobs
        setSavedJobs((prevSavedJobs) =>
          prevSavedJobs.filter((savedJob) => savedJob.jobId !== jobId)
        );

        // Update the `jobs` list to reflect the removed bookmark
        setJobs((prevJobs) =>
          prevJobs.map((item) =>
            item.jobId === jobId ? { ...item, isSaved: false } : item
          )
        );

        Toast.show({
          type: 'info',
          text1: 'Removed from Saved Jobs',
          position: 'top',
          visibilityTime: 3000,
        });
      } else {
        // Bookmark the job
        console.log("Bookmarking job with details:", jobDetails);
        await bookmarkJob(jobDetails);

        // If successful, add the job to savedJobs
        setSavedJobs((prevSavedJobs) => [...prevSavedJobs, jobDetails]);

        // Update the `jobs` list to reflect the added bookmark
        setJobs((prevJobs) =>
          prevJobs.map((item) =>
            item.jobId === jobId ? { ...item, isSaved: true } : item
          )
        );

        Toast.show({
          type: 'success',
          text1: 'Added to Saved Jobs',
          position: 'top',
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      console.error("Error updating bookmark:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }

      // Revert the UI state on error to ensure the user sees the correct state
      const rollbackJobs = jobs.map((item) =>
        item.jobId === jobId ? { ...item, isSaved: isAlreadySaved } : item
      );
      setJobs(rollbackJobs);
    } finally {
      setIsBookmarking(false);
    }
  };

  // Handle job press to open modal
  const handleJobPress = (job) => {
    setSelectedJob(job);
    setModalVisible(true);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* JobSearchBar */}
      <JobSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {/* JobFilterBar */}
      <JobFilterBar changeFilter={(type) => setFilterType(type)} />
      {/* JobFilterTags */}
      {/* <JobFilterTags activeFilter={activeFilter} setActiveFilter={setActiveFilter} /> */}

      {filterType === 0 ? (
        // Pass only saved jobs to SavedJobCard
        <SavedJobCard data={savedJobs.filter((job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase())
        )} toggleBookmark={toggleBookmark} />
      ) : (
        <View style={styles.container}>
          <JobFilterLocationItem
            data={jobs.filter((job) =>
              job.title.toLowerCase().includes(searchQuery.toLowerCase())
            )}
            toggleBookmark={toggleBookmark}
            handleJobPress={(job) => {
              setSelectedJob(job);
              setModalVisible(true);
            }}
          />
          {/* Load More Button */}
          <Button
            title={isLoading ? "Loading..." : "Load More"}
            onPress={loadMoreJobs}
            disabled={isLoading}
          />
        </View>
      )}

      {/* Job Details Modal */}
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
    width: '100%',
    height: '80%',
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
});

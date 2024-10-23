import { StyleSheet, Text, View, Modal, TouchableOpacity, Button, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import JobFilterBar from "./JobFilterBar";
import SavedJobCard from "./SavedJobCard";
import JobFilterLocationItem from "./JobFilterLocationItem";
import JobSearchBar from "./JobSearchBar";
import Toast from 'react-native-toast-message';
import JobFilterTags from './JobFilterTags'
import JobDetailsModal from "./JobDetailsModal"
import { bookmarkJob, unbookmarkJob, fetchSavedJobs, fetchJobs, fetchJobsByKeyword, } from '../services/api'; 
import JobCard from "./JobCard"; 



const jobListOutput = () => {
  const [filterType, setFilterType]=React.useState(1)
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false); 
  const [page, setPage] = useState(1);
  const [savedJobs, setSavedJobs] = useState([]);
  

    // State for active filter tag
  const [activeFilter, setActiveFilter] = useState(null); 

   // State for job details modal
   const [modalVisible, setModalVisible] = useState(false);
   const [selectedJob, setSelectedJob] = useState(null);

     // Use navigation hook
  const navigation = useNavigation();

  React.useEffect(() => {
    const getJobs = async () => {
      const jobsResult = await fetchJobs();
      setJobs(jobsResult);
      setPage(1);
    };

    getJobs();
    getSavedJobs();
  }, []);

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
      setSavedJobs([]);
    }
  };

  // Fetch more jobs when "Load More" is clicked
  const loadMoreJobs = async () => {
    if (isLoading) return; // Prevent multiple requests
    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const newJobs = await fetchJobs(nextPage); 
  
      if (newJobs.length > 0) {
        setJobs(prevJobs => [...prevJobs, ...newJobs]); 
        setPage(nextPage); 
      }
    } catch (error) {
      console.error('Error loading more jobs:', error);
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const allJobs = await fetchJobs(); // Fetch jobs from the API
        const saved = await fetchSavedJobs(); // Fetch saved jobs from the database

        const updatedJobs = allJobs.map((job) => {
          // Check if job is saved by comparing it to saved jobs list
          const isSaved = saved.some((savedJob) => savedJob.jobId === job.jobId);
          return { ...job, isSaved }; // Add isSaved flag to job
        });

        setJobs(updatedJobs); // Set jobs with updated bookmark state
        setSavedJobs(saved); // Keep the saved jobs in state for reference
      } catch (error) {
        console.error('Error loading jobs or saved jobs:', error);
      }
    };

    loadJobs(); // Call the function to load jobs when the component mounts
  }, []);


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
      isBookmarked: !job.isSaved // Toggle the saved state
  };

    const updatedJobs = jobs.map((item) =>
    item.jobId === jobId ? { ...item, isSaved: !item.isSaved } : item
    );

    setJobs(updatedJobs);

    try {
      if (job.isSaved) {
        await unbookmarkJob(jobId);
      } else {
        await bookmarkJob(jobDetails); // Ensure the jobDetails are correct here
    }

    await getSavedJobs();
  } catch (error) {
    console.error("Error updating bookmark:", error);
    if (error.response) {
      console.error("Server responded with:", error.response.data);
  }

    // Rollback the optimistic UI update on error
    const rollbackJobs = jobs.map((item) =>
      item.jobId === jobId ? { ...item, isSaved: job.isSaved } : item
    );
    setJobs(rollbackJobs);
  }


    // Show toast message based on the bookmark state
    const updatedJob = updatedJobs.find((item) => item.jobId === jobId);if (updatedJob.isSaved) {
     
      Toast.show({
        type: 'success',
        text1: 'Added to Saved Jobs',
        text2: `${job.title} has been bookmarked successfully!`,
        position: 'top',
        visibilityTime: 1500,
      });
    } else {
      Toast.show({
        type: 'info',
        text1: 'Removed from Saved Jobs',
        text2: `${job.title} has been removed from your saved jobs.`,
        position: 'top',
        visibilityTime: 1500,
      });
    }
  };

  const filteredSavedJobs = savedJobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle job press to open modal
  const handleJobPress = (job) => {
    setSelectedJob(job);
    setModalVisible(true);
  };

  return (

    <View style={{ flex: 1 }} >
      {/* JobSearchBar */}
      <JobSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
       {/* JobFilterBar */}
    <JobFilterBar changeFilter={(type) => setFilterType(type)} />
      {/* JobFilterTags */}
      <JobFilterTags activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
    

    {filterType === 0 ? (
      // Pass only saved jobs to SavedJobCard
      <SavedJobCard data={filteredSavedJobs} toggleBookmark={toggleBookmark} />
    ) : (
      
    <View style={styles.container}>
      <JobFilterLocationItem 
      data={jobs} 
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
    flex:1
  },
});


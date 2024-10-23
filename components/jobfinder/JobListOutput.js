import { StyleSheet, Text, View, Modal, TouchableOpacity, Button, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import JobFilterBar from "./JobFilterBar";
import SavedJobCard from "./SavedJobCard";
import JobFilterLocationItem from "./JobFilterLocationItem";
import JobSearchBar from "./JobSearchBar";
import Toast from 'react-native-toast-message';
import JobFilterTags from './JobFilterTags'
import JobDetailsModal from "./JobDetailsModal"
import { bookmarkJob, unbookmarkJob, fetchSavedJobs, fetchJobs } from '../services/api'; 
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
    // console.log(".......", jobsResult)
    setJobs(jobsResult);
    setPage(1);
    };

    getJobs();
  }, []);

  React.useEffect(() => {
    const getSavedJobs = async () => {
      try {
        const savedJobsResponse = await fetchSavedJobs();
        setSavedJobs(savedJobsResponse); // Set saved jobs from backend
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
      }
    };

    getSavedJobs();
  }, []);

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

  const toggleBookmark = async (job) => {
    const jobId = job.jobId;

    const updatedJobs = jobs.map((item) =>
    item.jobId === jobId ? { ...item, isSaved: !item.isSaved } : item
    );

    setJobs(updatedJobs);

    try {
      if (job.isSaved) {
        await unbookmarkJob(jobId); 
      } else {
        await bookmarkJob({ 
        jobId: job.jobId,
        title: job.title,
        company: job.company,
        companyInitial: job.companyInitial,
        description: job.description,
        createdDate: job.createdDate,
        url: job.url
      });
      }
      const updatedSavedJobs = await fetchSavedJobs();
      setSavedJobs(updatedSavedJobs);
    } catch (error) {
      console.error("Error updating bookmark:", error);
    }

    // Comment for showing the pop up message 
    // setJobs(updatedJobs);
    // await AsyncStorage.setItem("jobs", JSON.stringify(updatedJobs)); // Update AsyncStorage

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

    setJobs(updatedJobs);
  };

  const filteredSavedJobs = savedJobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

   // Filter saved jobs based on isSaved status

  //  const savedJobs = jobs?.filter((job) => job.isSaved);
  //  const filteredJobs = jobs?.filter((job) =>
  //   job.title.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  
  // const savedJobs = []
  // const filteredJobs = []

  // filter tags - filtering 
  // const displayedJobs = activeFilter 
  //   ? filteredJobs.filter(job => job.type === activeFilter.toLowerCase()) 
  //   : filteredJobs;
  const displayedJobs = []

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


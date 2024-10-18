import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import JobFilterBar from "./JobFilterBar";
import SavedJobCard from "./SavedJobCard";
import JobFilterLocationItem from "./JobFilterLocationItem";
import JobSearchBar from "./JobSearchBar";

import Toast from 'react-native-toast-message';
import JobFilterTags from './JobFilterTags'
import JobDetailsModal from "./JobDetailsModal"
import {fetchJobs} from "../services/api"


const output=[{
  id:"1",
  title: "UI/UX",
  description: "Design user interfaces and improve user experience.",
  date: "Added September 20, 2024",
  image: "",
  isSaved: false
},
{
   id:"2",
  title: "Product Designer",
  description: "Design user interfaces and improve user experience.",
  date: "Added September 20, 2024",
  image: "",
  isSaved: false
},
{
   id:"3",
  title: "Web Designer",
  description: "Design user interfaces and improve user experience.",
  date: "Added September 20, 2024",
  image: "",
  isSaved: false
},
{
  id:"4",
  title: "UI/UX",
  description: "Design user interfaces and improve user experience.",
  date: "Added September 20, 2024",
  image: "",
  isSaved: false
},
{
   id:"5",
  title: "Product Designer",
  description: "Design user interfaces and improve user experience.",
  date: "Added September 20, 2024",
  image: "",
  isSaved: false
},
{
   id:"6",
  title: "Web Designer",
  description: "Design user interfaces and improve user experience.",
  date: "Added September 20, 2024",
  image: "",
  isSaved: false
},
{
  id:"7",
  title: "UI/UX",
  description: "Design user interfaces and improve user experience.",
  date: "Added September 20, 2024",
  image: "",
  isSaved: false
}
]
const jobListOutput = () => {
  const [filterType, setFilterType]=React.useState(1)
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

    // State for active filter tag
  const [activeFilter, setActiveFilter] = useState(null); 

   // State for job details modal
   const [modalVisible, setModalVisible] = useState(false);
   const [selectedJob, setSelectedJob] = useState(null);

     // Use navigation hook
  const navigation = useNavigation();
  React.useEffect(() => {
    // const fetchJobs = async () => { await fetchJobs()
    // }
    // const jobs = fetchJobs()
    // console.log(".......", jobs)
    // setJobs(jobs)

    const getJobs = async () => {
      const jobsResult = await fetchJobs();
      console.log(".......", jobsResult)
  setJobs(jobsResult);
    };
  
    getJobs();

  }, [])


  const toggleBookmark = async (id) => {
    const updatedJobs = jobs.map((job) =>
      job.id === id ? { ...job, isSaved: !job.isSaved } : job
    );

    // Comment for showing the pop up message 
    // setJobs(updatedJobs);
    // await AsyncStorage.setItem("jobs", JSON.stringify(updatedJobs)); // Update AsyncStorage

    // Show toast message based on the bookmark state
    const job = updatedJobs.find((job) => job.id === id);
    if (job.isSaved) {
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
        text1: 'Bookmark Removed',
        text2: `${job.title} has been removed from your saved jobs.`,
        position: 'top',
        visibilityTime: 1500,
      });
    }
  };

   // Filter saved jobs based on isSaved status

  //  const savedJobs = jobs?.filter((job) => job.isSaved);
  //  const filteredJobs = jobs?.filter((job) =>
  //   job.title.toLowerCase().includes(searchQuery.toLowerCase())
  // );
  const savedJobs = []
  const filteredJobs = []

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

    <View>
      {/* JobSearchBar */}
      <JobSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
       {/* JobFilterBar */}
    <JobFilterBar changeFilter={(type) => setFilterType(type)} />
      {/* JobFilterTags */}
      <JobFilterTags activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
    

    {filterType === 0 ? (
      // Pass only saved jobs to SavedJobCard
      <SavedJobCard data={savedJobs.filter((job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase())
      )} toggleBookmark={toggleBookmark}
      />
    ) : (
      <JobFilterLocationItem 
      data={jobs} 
      toggleBookmark={toggleBookmark} 
      handleJobPress={handleJobPress} 
    />
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
});


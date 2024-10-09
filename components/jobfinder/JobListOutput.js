import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import JobFilterBar from "./JobFilterBar";
import SavedJobCard from "./SavedJobCard";
import JobFilterLocationItem from "./JobFilterLocationItem";
import JobSearchBar from "./JobSearchBar";

const output=[{
  id:"1",
  title: "UI/UX",
  date: "Added September 20, 2024",
  image: "",
  isSaved: false
},
{
   id:"2",
  title: "Product Designer",
  date: "Added September 20, 2024",
  image: "",
  isSaved: false
},
{
   id:"3",
  title: "Web Designer",
  date: "Added September 20, 2024",
  image: "",
  isSaved: false
},
{
  id:"4",
  title: "UI/UX",
  date: "Added September 20, 2024",
  image: "",
  isSaved: false
},
{
   id:"5",
  title: "Product Designer",
  date: "Added September 20, 2024",
  image: "",
  isSaved: false
},
{
   id:"6",
  title: "Web Designer",
  date: "Added September 20, 2024",
  image: "",
  isSaved: false
},
{
  id:"7",
  title: "UI/UX",
  date: "Added September 20, 2024",
  image: "",
  isSaved: false
},
{
   id:"8",
  title: "Product Designer",
  date: "Added September 20, 2024",
  image: "",
  isSaved: false
}
]
const jobListOutput = () => {
  const [filterType, setFilterType]=React.useState(0)
  const [jobs, setJobs] = useState(output);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleBookmark = async (id) => {
    const updatedJobs = jobs.map((job) =>
      job.id === id ? { ...job, isSaved: !job.isSaved } : job
    );
    setJobs(updatedJobs);
    await AsyncStorage.setItem("jobs", JSON.stringify(updatedJobs)); // Update AsyncStorage
  };

   // Filter saved jobs based on isSaved status
   const savedJobs = jobs.filter((job) => job.isSaved);

   const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (

    <View>
      {/* JobSearchBar */}
      <JobSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {/* JobFilterBar */}
    <JobFilterBar changeFilter={(type) => setFilterType(type)} />
    {filterType === 0 ? (
      // Pass only saved jobs to SavedJobCard
      <SavedJobCard data={savedJobs.filter((job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase())
      )} toggleBookmark={toggleBookmark} />
    ) : (
      <JobFilterLocationItem data={filteredJobs} toggleBookmark={toggleBookmark} />
    )}
  </View>
  );
};

export default jobListOutput;

const styles = StyleSheet.create({});

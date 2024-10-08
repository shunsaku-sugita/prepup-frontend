import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import JobFilterBar from "./JobFilterBar";
import SavedJobCard from "./SavedJobCard";
import JobFilterLocationItem from "./JobFilterLocationItem";

const output=[{
  title: "1",
  date: "Another date",
  image: "",
  isSaved: false
},
{
  title: "2",
  date: "Date",
  image: "",
  isSaved: false
},
{
  title: "3",
  date: "Some Date",
  image: "",
  isSaved: true
}]
const jobListOutput = () => {
  const [filterType, setFilterType]=React.useState(0)
  return (

    <View>
      <JobFilterBar changeFilter={(type)=> setFilterType(type)}/>
      <Text>jobListOutput</Text>
      <Ionicons name="bookmark-outline" 
      size={24} 
      color="black" />
      {
        filterType==0? <SavedJobCard data={output}/>
        : <JobFilterLocationItem data={output}/>
      }


    </View>
  );
};

export default jobListOutput;

const styles = StyleSheet.create({});

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";


const JobCard = ({job}) => {
  return (
    <View style={styles.container}>
      <Text>Image</Text>
      <View style={styles.subContainer}>
      <Text>{job.title}</Text>
      <Text>{job.date}</Text>
      </View>
      <Ionicons name={job.isSaved? "bookmark":"bookmark-outline"} 
      size={24} 
      color="black" />
    </View>
  );
};

export default JobCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
   flexDirection:"row",
  },

  subContainer: {
    width:"80%",
    paddingLeft:8,

  }

});

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";


const JobCard = ({ job, toggleBookmark, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text>Image</Text>
      <View style={styles.subContainer}>
        <Text style={styles.title}>{job.title}</Text>
        <Text>{job.date}</Text>
      </View>
      <TouchableOpacity onPress={() => toggleBookmark(job.id)}>
        <Ionicons
          name={job.isSaved ? "bookmark" : "bookmark-outline"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default JobCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
   flexDirection:"row",
   marginBottom: 16, 
   padding: 10, 
   borderBottomWidth: 2,
   borderColor: 'black',
   alignContent:"center",
   alignItems:"center",
  },

  subContainer: {
    width:"80%",
    paddingLeft:40,

  },

  title: {
    fontWeight: "bold",
    fontSize: 16,

  }

});

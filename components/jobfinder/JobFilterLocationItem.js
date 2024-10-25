import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import JobCard from "./JobCard";

const JobFilterLocationItem = ({ data, toggleBookmark, handleJobPress }) => {
  return (
    <View style={styles.jobList}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.jobId}
        renderItem={({ item }) => (
          <JobCard
            job={item}
            toggleBookmark={toggleBookmark}
            onPress={() => handleJobPress(item)}
          />
        )}
        numColumns={1}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default JobFilterLocationItem;

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 16,
  },
  jobList:{
    flex: 1, 
   
    

  },
});

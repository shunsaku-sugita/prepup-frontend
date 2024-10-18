import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import JobCard from "./JobCard"

// handleJobPress
const JobFilterLocationItem = ({ data, toggleBookmark, handleJobPress }) => {
  console.log("data", data)
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
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
});






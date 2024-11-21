import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import JobCard from "./JobCard";

const JobFilterLocationItem = ({
  data = [],
  toggleBookmark,
  handleJobPress,
}) => {
  return data.length > 0 ? (
    <View style={styles.jobList}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item.jobId}-${index}`}
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
  ) : (
    <Text style={styles.noJobsText}>No jobs available.</Text>
  );
};

export default JobFilterLocationItem;

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 16,
  },
  jobList: {
    flex: 1,
  },
});

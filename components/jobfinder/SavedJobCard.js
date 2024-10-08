import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import JobCard from "./JobCard";


const SavedJobCard = ({data}) => {
  return (
    <View>
      <Text>SavedJobCard</Text>
      <Ionicons name="bookmark" 
      size={24} 
      color="black" />

    <FlatList
        data={data}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <JobCard job={item} />}
        numColumns={1}
        contentContainerStyle={styles.listContent} // Padding around the list
      />
    </View>
  );
};

export default SavedJobCard;

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 16,
  },
});


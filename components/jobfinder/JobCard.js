import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const JobCard = ({ job, toggleBookmark, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/* logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>{job.companyInitial}</Text>
      </View>

      <View style={styles.subContainer}>
        <Text style={styles.title}>{job.title}</Text>
        <Text style={styles.createdDate}>{`Added ${job.createdDate}`}</Text>
        <Text>
          <Text style={{ fontWeight: 'bold' }}>Portal: </Text>
          Adzuna
        </Text>
      </View>

      {/* Bookmark Icon */}
      <TouchableOpacity onPress={() => toggleBookmark(job)}>
        <Ionicons
          name={job.isSaved ? "bookmark" : "bookmark-outline"}
          size={24}
          color={job.isSaved ? "black" : "black"}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default JobCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 16,
    padding: 10,
    borderBottomWidth: 2,
    borderColor: 'black',
    alignContent: "center",
    alignItems: "center",
    margin: 0,
  },
  subContainer: {
    width: "75%",
    paddingLeft: 40,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  createdDate: {
    fontSize: 14,
    color: 'gray',
  },
  logoContainer: {
    width: 64,
    height: 64,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});

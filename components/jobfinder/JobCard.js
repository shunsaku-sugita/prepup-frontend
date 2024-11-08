import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

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
        <Text style={styles.createdPortal}>
          <Text style={{ fontFamily: 'Mulish_700Bold' }}>Portal: </Text>
          Adzuna
        </Text>
      </View>

      {/* Bookmark Icon */}
      <TouchableOpacity onPress={() => toggleBookmark(job)}>
        <Ionicons
          name={job.isSaved ? "bookmark" : "bookmark-outline"}
          size={26}
          color={job.isSaved ? "#F7C42B" : "black"}
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
    borderBottomWidth: 1,
    borderColor: Colors.onPressYellow,
    alignContent: "center",
    alignItems: "center",
    margin: 0,
  },
  subContainer: {
    width: "75%",
    paddingLeft: 40,
    gap:3
  },
  title: {
    fontFamily:"MavenPro_700Bold",
    fontWeight: "700",
    fontSize: 20,
  },
  createdDate: {
    fontFamily: "Mulish_400Regular",
    fontSize: 16,
    fontWeight:400,
   
  },
  createdPortal: {
    fontFamily: "Mulish_400Regular",
    fontSize:16,
    
    
  },
  logoContainer: {
    width: 64,
    height: 64,
    backgroundColor: Colors.defaultBlue,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontFamily: "Mulish_800ExtraBold",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});

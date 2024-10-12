import { View, Text, StyleSheet } from "react-native";
import JobListOutput from "@/components/jobfinder/JobListOutput"

const JobSearchScreen = () => {
  return (
    <View style={styles.container}>
     <JobListOutput/>
    </View>
  );
};

export default JobSearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding:18,
    // alignItems: "center",
    // justifyContent: "center",
  },
  text: {
    fontSize: 24,
  },
});

import { View, Text, StyleSheet } from "react-native";
import JobListOutput from "@/components/jobfinder/JobListOutput";
import Toast from "react-native-toast-message";

const JobSearchScreen = () => {
  return (
    <View style={styles.container}>
     <JobListOutput/>
     <Toast ref={(ref) => Toast.setRef(ref)} />
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

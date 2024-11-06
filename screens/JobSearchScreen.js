import { View, StyleSheet } from "react-native";
import JobListOutput from "@/components/jobfinder/JobListOutput";
import Toast from "react-native-toast-message";
import { Colors } from "@/constants/Colors";

const JobSearchScreen = () => {
  return (
    <View style={styles.container}>
      <JobListOutput />
    </View>
  );
};

export default JobSearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.disabledBeige,
    padding: 18,
    // alignItems: "center",
    // justifyContent: "center",
  },
  text: {
    fontSize: 24,
  },
});

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fetchJobs } from "../services/api";
import { useEffect, useState } from "react";

const QuizStarterOutput = () => {
  const navigation = useNavigation();

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const loadJobs = async () => {
      const jobsData = await fetchJobs(1, "New York");
      setJobs(jobsData);
    };
    loadJobs();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Let's practice general quizes.</Text>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("QuizScreen")}
      >
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>

      {jobs.map((job) => (
        <View key={job.id}>
          <Text>{job.title}</Text>
        </View>
      ))}
    </View>
  );
};

export default QuizStarterOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  text: {
    fontSize: 24,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 4,
    marginBottom: 4,
    marginHorizontal: 8,
    width: 280,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
});

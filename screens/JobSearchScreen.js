import { View, Text, StyleSheet } from "react-native";

const JobSearchScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>JobSearch</Text>
    </View>
  );
};

export default JobSearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
  },
});

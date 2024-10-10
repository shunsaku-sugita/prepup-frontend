import { StyleSheet, Text, View } from "react-native";

const QuizStarterOutput = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>QuizStarterOutput</Text>
    </View>
  );
};

export default QuizStarterOutput;

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

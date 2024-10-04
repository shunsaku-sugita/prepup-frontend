import { StyleSheet, Text, View } from "react-native";

const QuizScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>QuizScreen</Text>
    </View>
  );
};

export default QuizScreen;

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

import { useNavigation } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import WideButton from "../common/WideButton";

const InterviewFeedbackButtons = ({ onPress }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <WideButton
        title="Try again"
        color="white"
        onPress={() => navigation.navigate("InterviewSimulator")}
      />
      <WideButton
        title="Save the questions"
        color="white"
        onPress={() => navigation.navigate("InterviewSimulator")}
        icon="add-circle-outline"
        size={24}
      />
      <TouchableOpacity
        style={styles.textButton}
        onPress={() => navigation.navigate("Category")}
      >
        <Text style={styles.text}>Back to categories</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InterviewFeedbackButtons;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    marginVertical: 10,
  },
  text: {
    fontSize: 20,
    color: "blue",
  },
});

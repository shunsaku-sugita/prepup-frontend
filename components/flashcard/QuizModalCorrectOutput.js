import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import QuizModalTitle from "./QuizModalTitle";
import QuizModalText from "./QuizModalText";

const QuizModalCorrectOutput = ({
  setModalVisible,
  setIsSelected,
  setSelectedAnswerIndex,
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Ionicons name="checkmark-circle-outline" color="black" size={100} />
      <QuizModalTitle title="Correct!" />
      <QuizModalText text="Your answer is correct." />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          navigation.navigate("QuizFeedback");
          setModalVisible(false);
          setIsSelected(false);
          setSelectedAnswerIndex(null);
        }}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuizModalCorrectOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 15,
    marginBottom: 40,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 4,
    marginHorizontal: 8,
    width: 160,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
});

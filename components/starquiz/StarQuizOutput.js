import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import StarQuizCarousel from "./StarQuizCarousel";
import HearableQuestions from "../common/HearableQuestions";
import { AppContext } from "@/store/app-context";
import WideButton from "../common/WideButton";
import { useNavigation } from "expo-router";

const StarQuizOutput = () => {
  const navigation = useNavigation();
  const { item, setItem } = useContext(AppContext);

  const { currentQuestionIndex, interviewQuestions } = item;
  let questionText = interviewQuestions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <HearableQuestions questionText={questionText} />
      <StarQuizCarousel />
      <WideButton
        title="Skip"
        color="white"
        size={24}
        onPress={() => navigation.navigate("StarQuizFeedback")}
      />
      <TouchableOpacity
        style={styles.textButton}
        onPress={() => {
          Alert.alert(
            "Cancel the Star Master?",
            "The process is unsaved, you will lose it.",
            [
              {
                text: "Cancel",
              },
              {
                text: "Confirm",
                onPress: () => {
                  navigation.goBack();
                },
              },
            ]
          );
        }}
        // onPress={() => navigation.navigate("Category")}
      >
        <Text style={styles.text}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StarQuizOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 40,
    width: "100%",
  },
});

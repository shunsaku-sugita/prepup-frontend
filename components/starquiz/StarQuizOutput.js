import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
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

  // Separate states for four input fields to pass as props (pass them to <StarQuizCarousel />)
  const [situationAnswer, setSituationAnswer] = useState("");
  const [taskAnswer, setTaskAnswer] = useState("");
  const [actionAnswer, setActionAnswer] = useState("");
  const [resultAnswer, setResultAnswer] = useState("");

  const skipOrDoneButtonHandler = () => {
    const randomIndex = Math.floor(Math.random() * 5);

    if (!situationAnswer && !taskAnswer && !actionAnswer && !resultAnswer) {
      setItem((prevState) => ({
        ...prevState,
        currentQuestionIndex: randomIndex,
      }));
    } else {
      Alert.alert(
        "Submit and get a feedback?",
        "Once you have done editting, you can proceed.",
        [
          {
            text: "Cancel",
          },
          {
            text: "Confirm",
            onPress: () => {
              navigation.navigate("StarQuizFeedback");
              setSituationAnswer("");
              setTaskAnswer("");
              setActionAnswer("");
              setResultAnswer("");
            },
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <HearableQuestions questionText={questionText} />
      </View>
      <StarQuizCarousel
        situationAnswer={situationAnswer}
        setSituationAnswer={setSituationAnswer}
        taskAnswer={taskAnswer}
        setTaskAnswer={setTaskAnswer}
        actionAnswer={actionAnswer}
        setActionAnswer={setActionAnswer}
        resultAnswer={resultAnswer}
        setResultAnswer={setResultAnswer}
      />
      <View style={styles.buttons}>
        <WideButton
          title={
            situationAnswer || taskAnswer || actionAnswer || resultAnswer
              ? "Done"
              : "Skip"
          }
          color="white"
          size={24}
          onPress={skipOrDoneButtonHandler}
        />
        <TouchableOpacity
          style={styles.textButton}
          onPress={() => {
            Alert.alert(
              "Cancel the STAR Master?",
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
        >
          <Text style={styles.text}>Cancel</Text>
        </TouchableOpacity>
      </View>
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
  questionContainer: {
    flex: 1.5,
  },
  buttons: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 15,
  },
});

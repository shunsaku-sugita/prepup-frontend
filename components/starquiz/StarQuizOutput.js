import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import StarQuizCarousel from "./StarQuizCarousel";
import HearableQuestions from "../common/HearableQuestions";
import WideButton from "../common/WideButton";
import { useNavigation } from "expo-router";
import { getStarMasterQuestion } from "../services/api";

const StarQuizOutput = () => {
  const navigation = useNavigation();
  const [starQuestionText, setStarQuestionText] = useState("");

  const fetchStarQuestion = async () => {
    try {
      const starQuestionData = await getStarMasterQuestion();
      const starRandomQuestion = starQuestionData.question;
      setStarQuestionText(starRandomQuestion);
    } catch (error) {
      console.error("Error fetching STAR question:", error);
    }
  };

  useEffect(() => {
    // Fetch the random question initially
    fetchStarQuestion();
  }, []);

  // Separate states for four input fields to pass as props (pass them to <StarQuizCarousel />)
  const [situationAnswer, setSituationAnswer] = useState("");
  const [taskAnswer, setTaskAnswer] = useState("");
  const [actionAnswer, setActionAnswer] = useState("");
  const [resultAnswer, setResultAnswer] = useState("");

  const [answersArray, setAnswersArray] = useState([]);
  const saveAnswersHandler = () => {
    setAnswersArray([situationAnswer, taskAnswer, actionAnswer, resultAnswer]);
  };

  const skipOrDoneButtonHandler = () => {
    if (!situationAnswer && !taskAnswer && !actionAnswer && !resultAnswer) {
      // fetch the random question whenever press the skip button
      fetchStarQuestion();
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
              saveAnswersHandler(); // save answers into an array
              navigation.navigate("StarQuizFeedback");
              setSituationAnswer("");
              setTaskAnswer("");
              setActionAnswer("");
              setResultAnswer("");
            },
          },
        ]
      );
      console.log(answersArray);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <HearableQuestions questionText={starQuestionText} />
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
    flex: 2,
  },
  buttons: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 15,
    // marginBottom: 10,
  },
});

import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import StarQuizCarousel from "./StarQuizCarousel";
import HearableQuestions from "../common/HearableQuestions";
import WideButton from "../common/WideButton";
import { useNavigation } from "expo-router";
import {
  anayzeStarMasterAnsewers,
  getStarMasterQuestion,
} from "../services/api";
import { AppContext } from "@/store/app-context";
import { useIsFocused } from "@react-navigation/native";
import { Colors } from "@/constants/Colors";

const StarQuizOutput = () => {
  const navigation = useNavigation();
  const [starQuestionText, setStarQuestionText] = useState("");

  // track if the screen is in focus
  const isFocused = useIsFocused();
  // create a ref for the ScrollView (to always come back to/start from the leftmost screen)
  const scrollViewRef = useRef(null);

  // Separate states for four input fields, and combined answers state
  const {
    situationAnswer,
    setSituationAnswer,
    taskAnswer,
    setTaskAnswer,
    actionAnswer,
    setActionAnswer,
    resultAnswer,
    setResultAnswer,
    answers,
    setAnswers,
    situationAnswerRef,
    taskAnswerRef,
    actionAnswerRef,
    resultAnswerRef,
  } = useContext(AppContext);

  // fetch a random question when the page is mounted
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
    if (isFocused) {
      // reset input fields when the screen comes into focus
      setSituationAnswer("");
      setTaskAnswer("");
      setActionAnswer("");
      setResultAnswer("");
      situationAnswerRef.current = "";
      taskAnswerRef.current = "";
      actionAnswerRef.current = "";
      resultAnswerRef.current = "";

      // always scroll to the leftmost (start) position by default
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: 0, animated: true });
      }
    }
    // Fetch the random question initially
    fetchStarQuestion();
  }, [isFocused]);

  // the state is only updated once the input field loses focus (onBlur), avoiding re-renders on every keystroke
  const handleBlur = (field) => {
    switch (field) {
      case "situation":
        setSituationAnswer(situationAnswerRef.current);
        break;
      case "task":
        setTaskAnswer(taskAnswerRef.current);
        break;
      case "action":
        setActionAnswer(actionAnswerRef.current);
        break;
      case "result":
        setResultAnswer(resultAnswerRef.current);
        break;
      default:
        break;
    }
  };

  // submit typed answers and get feedback text and average score
  const fetchStarMasterFeedback = async () => {
    try {
      // create a structured data to communicate with the endpoint
      const structuredData = {
        question: starQuestionText,
        // answers: answers,
        answers: {
          situation: situationAnswerRef.current,
          task: taskAnswerRef.current,
          action: actionAnswerRef.current,
          result: resultAnswerRef.current,
        },
      };
      // call the method and pass the structured data
      const starMasterFeedback = await anayzeStarMasterAnsewers(
        structuredData.question,
        structuredData.answers
      );
      if (starMasterFeedback) {
        // console.log("Received Feedback: ", starMasterFeedback);
        // navigate to the feedback screen, passing the feedback as a parameter
        navigation.navigate("StarQuizFeedback", { starMasterFeedback });
      }
    } catch (error) {
      console.error("Error fetching STAR feedback:", error);
    }
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
            onPress: async () => {
              // call the fetch method and navigate to the next screen, passing the feedback as a parameter
              await fetchStarMasterFeedback();
            },
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <HearableQuestions questionText={starQuestionText} />
      </View>
      <StarQuizCarousel
        situationAnswerRef={situationAnswerRef}
        setSituationAnswer={setSituationAnswer}
        taskAnswerRef={taskAnswerRef}
        setTaskAnswer={setTaskAnswer}
        actionAnswerRef={actionAnswerRef}
        setActionAnswer={setActionAnswer}
        resultAnswerRef={resultAnswerRef}
        setResultAnswer={setResultAnswer}
        answers={answers}
        setAnswers={setAnswers}
        handleBlur={handleBlur}
        scrollViewRef={scrollViewRef}
      />
      {/* <View style={styles.buttons}>
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
                    navigation.navigate("Category");
                  },
                },
              ]
            );
          }}
        >
          <Text style={styles.text}>Cancel</Text>
        </TouchableOpacity>
      </View> */}

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
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
                    navigation.navigate("Category");
                  },
                },
              ]
            );
          }}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.skipOrNextButton}
          onPress={skipOrDoneButtonHandler}
        >
          <Text style={styles.skipOrNextText}>{
            situationAnswer || taskAnswer || actionAnswer || resultAnswer
              ? "Done"
              : "Skip"
          }</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StarQuizOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultBeige,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 40,
    width: "100%",
  },
  questionContainer: {
    flex: 2,
    marginTop: 5,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 10,
    marginTop: 16,
    paddingHorizontal: 26,
    width: "100%",
  },
  cancelButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.defaultBeige,
    borderWidth: 2,
    borderColor: Colors.defaultBlue,
    borderRadius: 6,
    padding: 10,
    width: "50%",
  },
  cancelText: {
    fontSize: 16,
    color: Colors.defaultBlue,
    fontWeight: "bold",
  },
  skipOrNextButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.defaultBlue,
    borderWidth: 2,
    borderColor: Colors.defaultBlue,
    borderRadius: 6,
    padding: 10,
    width: "50%",
  },
  skipOrNextText: {
    fontSize: 16,
    fontWeight: "bold",
    color: 'white',
  }
});

import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import StarQuizCarousel from "./StarQuizCarousel";
import HearableQuestions from "../common/HearableQuestions";
import WideButton from "../common/WideButton";
import { useNavigation } from "expo-router";
import { getStarMasterQuestion } from "../services/api";
import { AppContext } from "@/store/app-context";

const StarQuizOutput = () => {
  const navigation = useNavigation();
  const [starQuestionText, setStarQuestionText] = useState("");

  // useRef to prevent re-renders during typing
  const situationAnswerRef = useRef("");
  const taskAnswerRef = useRef("");
  const actionAnswerRef = useRef("");
  const resultAnswerRef = useRef("");

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
  } = useContext(AppContext);

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

  const saveAnswersHandler = useCallback(() => {
    const newAnswersArray = [
      situationAnswer,
      taskAnswer,
      actionAnswer,
      resultAnswer,
    ];
    console.log("Updated Answers Array:", newAnswersArray);
  }, [situationAnswer, taskAnswer, actionAnswer, resultAnswer]);

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
  },
});

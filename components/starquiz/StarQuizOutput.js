import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import StarQuizCarousel from "./StarQuizCarousel";
import StarQuizCardModal from "./StarQuizCardModal";
import HearableQuestions from "../common/HearableQuestions";
import { useNavigation } from "expo-router";
import {
  anayzeStarMasterAnsewers,
  getStarMasterQuestion,
} from "../services/api";
import { AppContext } from "@/store/app-context";
import { useIsFocused } from "@react-navigation/native";
import { Colors } from "@/constants/Colors";
import LoadingOverlay from "../common/LoadingOverlay";

const StarQuizOutput = () => {
  const navigation = useNavigation();
  const [starQuestionText, setStarQuestionText] = useState("");
  const [modalVisible, setModalVisible] = useState({
    situation: false,
    task: false,
    action: false,
    result: false,
  });
  const [isCharacterLimit, setIsCharacterLimit] = useState(false);

  const [situationCountNumber, setSituationCountNumber] = useState(0);
  const [taskCountNumber, setTaskCountNumber] = useState(0);
  const [actionCountNumber, setActionCountNumber] = useState(0);
  const [resultCountNumber, setResultCountNumber] = useState(0);

  const [backgroundColor, setBackgroundColor] = useState("white");

  // track if the screen is in focus
  const isFocused = useIsFocused();
  // create a ref for the ScrollView (to move to a specific position of the screen
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
    loading,
    setLoading,
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

  const handleFocus = (field) => {
    console.log(`Field ${field} focused`);
    setModalVisible((prev) => ({ ...prev, [field]: true }));

    switch (field) {
      case "situation":
        setBackgroundColor(Colors.disabledYellow);
        break;
      case "task":
        setBackgroundColor(Colors.disabledRed);
        break;
      case "action":
        setBackgroundColor(Colors.disabledBlue);
        break;
      case "result":
        setBackgroundColor(Colors.defaultBeige);
        break;
      default:
        setBackgroundColor("white");
        break;
    }
  };

  const handleModalClose = (field) => {
    setModalVisible((prev) => ({ ...prev, [field]: false }));
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

      setLoading(true);
      // call the method and pass the structured data
      const starMasterFeedback = await anayzeStarMasterAnsewers(
        structuredData.question,
        structuredData.answers
      );
      // set loading state to false once feedback is ready
      setLoading(false);

      if (starMasterFeedback) {
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
              // navigate to the feedback screen immediately
              navigation.navigate("StarQuizFeedback", { loading: true });
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
        handleFocus={handleFocus}
        scrollViewRef={scrollViewRef}
        isCharacterLimit={isCharacterLimit}
        setIsCharacterLimit={setIsCharacterLimit}
        situationCountNumber={situationCountNumber}
        setSituationCountNumber={setSituationCountNumber}
        taskCountNumber={taskCountNumber}
        setTaskCountNumber={setTaskCountNumber}
        actionCountNumber={actionCountNumber}
        setActionCountNumber={setActionCountNumber}
        resultCountNumber={resultCountNumber}
        setResultCountNumber={setResultCountNumber}
      />

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
          <Text style={styles.skipOrNextText}>
            {situationAnswer || taskAnswer || actionAnswer || resultAnswer
              ? "Done"
              : "Skip"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* <StarQuizCardModal
        situationAnswerRef={situationAnswerRef}
        setSituationAnswer={setSituationAnswer}
        taskAnswerRef={taskAnswerRef}
        setTaskAnswer={setTaskAnswer}
        actionAnswerRef={actionAnswerRef}
        setActionAnswer={setActionAnswer}
        resultAnswerRef={resultAnswerRef}
        setResultAnswer={setResultAnswer}
        handleBlur={handleBlur}
        scrollViewRef={scrollViewRef}
        answers={answers}
        setAnswers={setAnswers}
        handleFocus={handleFocus}
        isCharacterLimit={isCharacterLimit}
        setIsCharacterLimit={setIsCharacterLimit}
        situationCountNumber={situationCountNumber}
        setSituationCountNumber={setSituationCountNumber}
        taskCountNumber={taskCountNumber}
        setTaskCountNumber={setTaskCountNumber}
        actionCountNumber={actionCountNumber}
        setActionCountNumber={setActionCountNumber}
        resultCountNumber={resultCountNumber}
        setResultCountNumber={setResultCountNumber}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleModalClose={handleModalClose}
        backgroundColor={backgroundColor}
      /> */}
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
    color: "white",
  },
  // modalContainer: {
  //   flex: 1,
  //   justifyContent: "flex-end", // Align the modal to the bottom of the screen
  //   backgroundColor: "rgba(0, 0, 0, 0.2)", // Transparent background
  //   width: "100%",
  // },
  // modalContent: {
  //   height: "73%",
  //   borderTopLeftRadius: 20,
  //   borderTopRightRadius: 20,
  //   paddingHorizontal: 15,
  //   paddingVertical: 8,
  //   alignItems: "center",
  //   justifyContent: "flex-start",
  // },
});

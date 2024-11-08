import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import StarQuizCarousel from "./StarQuizCarousel";
import HearableQuestions from "../common/HearableQuestions";

import {
  anayzeStarMasterAnsewers,
  getStarMasterQuestion,
} from "../services/api";
import { AppContext } from "@/store/app-context";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "@/constants/Colors";

const StarQuizOutput = () => {
  const navigation = useNavigation();
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
    situationInputRef,
    taskInputRef,
    actionInputRef,
    resultInputRef,
    setLoading,
    situationIsCharacterLimit,
    setSituationIsCharacterLimit,
    taskIsCharacterLimit,
    setTaskIsCharacterLimit,
    actionIsCharacterLimit,
    setActionIsCharacterLimit,
    resultIsCharacterLimit,
    setResultIsCharacterLimit,
    situationCountNumber,
    setSituationCountNumber,
    taskCountNumber,
    setTaskCountNumber,
    actionCountNumber,
    setActionCountNumber,
    resultCountNumber,
    setResultCountNumber,
    starQuestionText,
    setStarQuestionText,
    focusedField,
    setFocusedField,
    setFieldType,
    handleBlur,
    fontsLoaded,
  } = useContext(AppContext);

  const [modalVisible, setModalVisible] = useState({
    situation: false,
    task: false,
    action: false,
    result: false,
  });

  // create a ref for the ScrollView (to move to a specific position of the screen
  const scrollViewRef = useRef(null);

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
    handleModalClose();

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
    // Fetch the random question initially
    fetchStarQuestion();
  }, []);

  const handleFocus = (field) => {
    setFocusedField(field); // Set the currently focused field
    setModalVisible((prev) => ({ ...prev, [field]: true }));
  };

  const handleModalClose = () => {
    setModalVisible({
      situation: false,
      task: false,
      action: false,
      result: false,
    });
    setFocusedField(null); // Reset the focused field
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
              // always scroll to the leftmost (start) position by default
              if (scrollViewRef.current) {
                scrollViewRef.current.scrollTo({ x: 0, animated: true });
              }
            },
          },
        ]
      );
    }
  };

  if (!fontsLoaded) {
    return null; // return null if fonts aren't loaded
  }

  return (
    // <KeyboardAvoidingView
    //   style={{ flex: 1 }}
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    // >
    //   <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    //     <ScrollView contentContainerStyle={{ flex: 1 }}>
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
        situationInputRef={situationInputRef}
        taskInputRef={taskInputRef}
        actionInputRef={actionInputRef}
        resultInputRef={resultInputRef}
        answers={answers}
        setAnswers={setAnswers}
        handleBlur={handleBlur}
        handleFocus={handleFocus}
        scrollViewRef={scrollViewRef}
        situationIsCharacterLimit={situationIsCharacterLimit}
        setSituationIsCharacterLimit={setSituationIsCharacterLimit}
        taskIsCharacterLimit={taskIsCharacterLimit}
        setTaskIsCharacterLimit={setTaskIsCharacterLimit}
        actionIsCharacterLimit={actionIsCharacterLimit}
        setActionIsCharacterLimit={setActionIsCharacterLimit}
        resultIsCharacterLimit={resultIsCharacterLimit}
        setResultIsCharacterLimit={setResultIsCharacterLimit}
        situationCountNumber={situationCountNumber}
        setSituationCountNumber={setSituationCountNumber}
        taskCountNumber={taskCountNumber}
        setTaskCountNumber={setTaskCountNumber}
        actionCountNumber={actionCountNumber}
        setActionCountNumber={setActionCountNumber}
        resultCountNumber={resultCountNumber}
        setResultCountNumber={setResultCountNumber}
        focusedField={focusedField}
        setFieldType={setFieldType}
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
    </View>
    //     </ScrollView>
    //   </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  );
};

export default StarQuizOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.disabledBeige,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 40,
    width: "100%",
  },
  questionContainer: {
    flex: 1.5,
    marginTop: 10,
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
    backgroundColor: Colors.disabledBeige,
    borderWidth: 2,
    borderColor: Colors.defaultBlue,
    borderRadius: 6,
    padding: 10,
    width: "50%",
  },
  cancelText: {
    fontSize: 16,
    color: Colors.defaultBlue,
    fontFamily: "Mulish-ExtraBold",
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
    fontFamily: "Mulish-ExtraBold",
    color: "white",
  },
});

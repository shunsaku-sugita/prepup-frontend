import { StyleSheet, Text, View } from "react-native";
import InterviewAnswerScript from "./InterviewAnswerScript";
import InterviewControllerIcons from "./InterviewControllerIcons";
import HearableQuestions from "../common/HearableQuestions";
import ProgressBar from "../common/ProgressBar";
import { AppContext } from "@/store/app-context";
import { useContext, useEffect, useState } from "react";
import { getInterviewCategory } from "../services/api";
import { analyzeAnswer } from "../services/api";

const InterviewContentsOutput = () => {
  const {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    selectedCategoryQuestions,
    setSelectedCategoryQuestions,
    questionAnswerArray,
    setQuestionAnswerArray,
    analyzedAnswer,
    setAnalyzedAnswer,
  } = useContext(AppContext);

  const questionText = selectedCategoryQuestions[currentQuestionIndex];
  // const { currentQuestionIndex, interviewQuestions } = item;
  // let questionText = interviewQuestions[currentQuestionIndex];

  // const [occupationalQuestions, setOccupationalQuestions] = useState([]);
  // const [generalQuestions, setGeneralQuestions] = useState([]);
  // const [behavioralQuestions, setBehavioralQuestions] = useState([]);

  // useEffect(() => {
  //   const loadCategories = async () => {
  //     const data = await getInterviewCategory();
  //     const categoriesData = data.category;

  //     // Extract questions for each category
  //     categoriesData.forEach((category) => {
  //       // const question = category.questions[index].question;
  //       if (category.categoryName === "React developer") {
  //         setOccupationalQuestions((prevState) => [
  //           ...prevState,
  //           ...category.questions.map((q) => q.question),
  //         ]);
  //       } else if (category.categoryName === "General") {
  //         setGeneralQuestions((prevState) => [
  //           ...prevState,
  //           ...category.questions.map((q) => q.question),
  //         ]);
  //       } else if (category.categoryName === "Behavioral") {
  //         setBehavioralQuestions((prevState) => [
  //           ...prevState,
  //           ...category.questions.map((q) => q.question),
  //         ]);
  //       }
  //     });
  //   };
  //   loadCategories();
  // }, []);

  // Debugging: Logging the updated state with a separate useEffect
  // useEffect(() => {
  //   console.log("============================");
  //   console.log("React developer questions:", occupationalQuestions);
  //   console.log("General questions:", generalQuestions);
  //   console.log("Behavioral questions:", behavioralQuestions);
  // }, [occupationalQuestions, generalQuestions, behavioralQuestions]);

  return (
    <View style={styles.container}>
      <ProgressBar
        currentIndexNum={currentQuestionIndex}
        totalNum={selectedCategoryQuestions.length}
      />
      <View style={styles.questions}>
        <HearableQuestions questionText={questionText} />
      </View>
      <View style={styles.innerContainer}>
        <InterviewControllerIcons
          currentQuestionIndex={currentQuestionIndex}
          interviewQuestions={selectedCategoryQuestions}
          questionText={questionText}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          questionAnswerArray={questionAnswerArray}
          setQuestionAnswerArray={setQuestionAnswerArray}
          analyzedAnswer={analyzedAnswer}
          setAnalyzedAnswer={setAnalyzedAnswer}
        />
      </View>
    </View>
  );
};

export default InterviewContentsOutput;

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
  questions: {
    flex: 2,
  },
  innerContainer: {
    flex: 7.5,
    width: "85%",
    alignItems: "center",
  },
});

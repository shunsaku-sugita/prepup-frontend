import { createContext, useRef, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedCategoryQuestions, setSelectedCategoryQuestions] = useState(
    []
  );
  const [progressUpdate, setProgressUpdate] = useState(null);
  const [categories, setCategories] = useState([]);
  const [questionAnswerArray, setQuestionAnswerArray] = useState([]);
  const [analyzedAnswer, setAnalyzedAnswer] = useState([]);

  const [situationAnswer, setSituationAnswer] = useState("");
  const [taskAnswer, setTaskAnswer] = useState("");
  const [actionAnswer, setActionAnswer] = useState("");
  const [resultAnswer, setResultAnswer] = useState("");
  const [answers, setAnswers] = useState({
    situation: "",
    task: "",
    action: "",
    result: "",
  });

  // useRef to prevent re-renders during typing in STAR master
  const situationAnswerRef = useRef("");
  const taskAnswerRef = useRef("");
  const actionAnswerRef = useRef("");
  const resultAnswerRef = useRef("");

  return (
    <AppContext.Provider
      // can provide states and functions grobally
      value={{
        currentQuestionIndex,
        setCurrentQuestionIndex,
        selectedCategoryQuestions,
        setSelectedCategoryQuestions,
        questionAnswerArray,
        setQuestionAnswerArray,
        categories,
        setCategories,
        analyzedAnswer,
        setAnalyzedAnswer,
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
        progressUpdate,
        setProgressUpdate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

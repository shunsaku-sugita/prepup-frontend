import { useRoute } from "@react-navigation/native";
import { createContext, useRef, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
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

  const [starQuestionText, setStarQuestionText] = useState("");

  // useRef to prevent re-renders during typing in STAR master
  const situationAnswerRef = useRef("");
  const taskAnswerRef = useRef("");
  const actionAnswerRef = useRef("");
  const resultAnswerRef = useRef("");

  const situationInputRef = useRef(null);
  const taskInputRef = useRef(null);
  const actionInputRef = useRef(null);
  const resultInputRef = useRef(null);

  const [situationIsCharacterLimit, setSituationIsCharacterLimit] =
    useState(false);
  const [taskIsCharacterLimit, setTaskIsCharacterLimit] = useState(false);
  const [actionIsCharacterLimit, setActionIsCharacterLimit] = useState(false);
  const [resultIsCharacterLimit, setResultIsCharacterLimit] = useState(false);

  const [situationCountNumber, setSituationCountNumber] = useState(0);
  const [taskCountNumber, setTaskCountNumber] = useState(0);
  const [actionCountNumber, setActionCountNumber] = useState(0);
  const [resultCountNumber, setResultCountNumber] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState("white");

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
        situationInputRef,
        taskInputRef,
        actionInputRef,
        resultInputRef,
        progressUpdate,
        setProgressUpdate,
        loading,
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
        backgroundColor,
        setBackgroundColor,
        starQuestionText,
        setStarQuestionText,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

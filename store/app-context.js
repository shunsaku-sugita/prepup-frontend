import LoadingOverlay from "@/components/common/LoadingOverlay";
import { useFonts } from "expo-font";
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

  // Track current field
  const [focusedField, setFocusedField] = useState(null);
  const [fieldType, setFieldType] = useState(null);

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

  const [fontsLoaded] = useFonts({
    "Mulish-Regular": require("../assets/fonts/Mulish-Regular.ttf"),
    "Mulish-Medium": require("../assets/fonts/Mulish-Medium.ttf"),
    "Mulish-SemiBold": require("../assets/fonts/Mulish-SemiBold.ttf"),
    "Mulish-Bold": require("../assets/fonts/Mulish-Bold.ttf"),
    "Mulish-ExtraBold": require("../assets/fonts/Mulish-ExtraBold.ttf"),
    "MavenPro-Regular": require("../assets/fonts/MavenPro-Regular.ttf"),
    "MavenPro-Medium": require("../assets/fonts/MavenPro-Medium.ttf"),
    "MavenPro-SemiBold": require("../assets/fonts/MavenPro-SemiBold.ttf"),
    "MavenPro-Bold": require("../assets/fonts/MavenPro-Bold.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    // Show a loading screen while fonts are loading
    return <LoadingOverlay />;
  }

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
        focusedField,
        setFocusedField,
        fieldType,
        setFieldType,
        handleBlur,
        fontsLoaded,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

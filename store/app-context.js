import { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [item, setItem] = useState({
    userName: "Bill",
    interviewQuestionText: [
      "Tell me something about yourself.",
      "What is your strength?",
    ],
    currentQuestionIndex: 0,
    categories: ["My Occupation", "General", "Behavioural"],
    quizQuestionText: [
      "How should you sit in an interview?",
      "How did you come to this office today?",
    ],
    quizAnswerOption: ["A.", "B.", "C."],
    quizAnswerText: [
      "Upright and staring at people.",
      "Slouch and no eye contact.",
      "Upright and looking at people but not staring.",
    ],
  });

  return (
    <AppContext.Provider value={{ item, setItem }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

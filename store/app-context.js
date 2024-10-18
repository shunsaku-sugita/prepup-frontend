import { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [item, setItem] = useState({
    userName: "Bill",
    interviewQuestions: [
      "Please tell me about yourself.",
      "What is your strength?",
      "How do you resolve conflict at work?",
      "How do you set long-term career goals?",
      "How do you motivate others on the team?",
    ],
    currentQuestionIndex: 0,
    categories: ["My Occupation", "General", "Behavioural"],
    quizQuestionOptions: [
      "How should you sit in an interview?",
      "How did you come to this office today?",
      "What should be the third question?",
    ],
    quizAnswerOrders: ["A.", "B.", "C."],
    quizAnswerOptions: [
      [
        "Upright and staring at people.",
        "Slouch and no eye contact.",
        "Upright and looking at people but not staring.",
      ],
      ["Sky Train.", "Walk.", "I don't remember..."],
      ["I don't know.", "You can ask anything.", "Forget about the interview."],
    ],
    correctAnswerIndex: [2, 0, 1],
  });

  return (
    <AppContext.Provider value={{ item, setItem }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

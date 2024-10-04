import { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [item, setItem] = useState({
    userName: "Bill",
    questionText: ["Please tell me about yourself.", "What is your strength?"],
    currentQuestionIndex: 0,
    quizCategories: ["My Occupation", "General", "Behavioural"],
  });

  return (
    <AppContext.Provider value={{ item, setItem }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

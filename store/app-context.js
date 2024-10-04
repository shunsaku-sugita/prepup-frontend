import { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [item, setItem] = useState({
    userName: "Bill",
    questionText: ["Please tell me about yourself.", "What is your strength?"],
    currentQuestionIndex: 0,
    quizCategories: [
      "UI/UX Designer",
      "Softwear Developer",
      "Data Analyst",
      "Finance Clerk",
      "Accountant",
      "Sales associate",
      "Factory Manager",
      "Registerd Nurse",
    ],
  });

  return (
    <AppContext.Provider value={{ item, setItem }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

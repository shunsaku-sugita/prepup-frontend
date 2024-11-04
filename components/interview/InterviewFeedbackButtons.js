import { useNavigation } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Platform, Text, TouchableOpacity } from "react-native";
import { Modal, StyleSheet, View } from "react-native";
// import { AppContext } from "../../store/app-context";
import CreateCategoryModal from "./CreateCategoryModal";
// import CreateCategorySuccessModal from "./CreateCategorySuccessModal";
import { saveInterviewQuestions } from "../services/api";
import { Colors } from "@/constants/Colors";
import WideButton from "../common/WideButton";

const InterviewFeedbackButtons = ({
  setCurrentQuestionIndex,
  selectedCategoryQuestions,
  setSelectedCategoryQuestions,
  setQuestionAnswerArray,
  categories,
  setCategories,
  progressUpdate,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    console.log("=== progressUpdate ===");
    console.log(progressUpdate);
  }, []);

  let categoryOutputModal = (
    <CreateCategoryModal
      setModalVisible={setModalVisible}
      isSaved={isSaved}
      setIsSaved={setIsSaved}
      categories={categories}
      setCategories={setCategories}
      selectedCategoryQuestions={selectedCategoryQuestions}
      setSelectedCategoryQuestions={setSelectedCategoryQuestions}
      saveInterviewQuestions={saveInterviewQuestions}
    />
  );
  // if (isSaved) {
  //   categoryOutputModal = (
  //     <CreateCategorySuccessModal
  //       categories={categories}
  //       modalVisible={modalVisible}
  //       setModalVisible={setModalVisible}
  //       selectedCategoryQuestions={selectedCategoryQuestions}
  //     />
  //   );

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        {progressUpdate === null ? (
          <WideButton
            title="Try Again"
            color="white"
            onPress={() => {
              setCurrentQuestionIndex(0);
              setQuestionAnswerArray([]);
              navigation.navigate("InterviewSimulator");
            }}
          />
        ) : (
          <>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.saveText}>Save Practice</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tryAgainButton}
              onPress={() => {
                setCurrentQuestionIndex(0);
                setQuestionAnswerArray([]);
                navigation.navigate("InterviewSimulator");
              }}
            >
              <Text style={styles.tryAgainText}>Try Again</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Close modal when back button is pressed
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>{categoryOutputModal}</View>
        </View>
      </Modal>
    </View>
  );
};

export default InterviewFeedbackButtons;

const styles = StyleSheet.create({
  container: {
    flex: Platform.OS === "ios" ? 1.2 : 1.0,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 15,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    columnGap: 15,
    width: 340,
  },
  saveButton: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.defaultBlue,
    borderRadius: 6,
    padding: 10,
    width: "48%",
  },
  saveText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.defaultBlue,
  },
  tryAgainButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.defaultBlue,
    borderWidth: 2,
    borderColor: Colors.defaultBlue,
    borderRadius: 6,
    padding: 10,
    width: "48%",
  },
  tryAgainText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end", // Align the modal to the bottom of the screen
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent background
  },
  modalContent: {
    height: "40%", // Half-screen height for the modal
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});

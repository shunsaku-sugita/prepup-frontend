import { useNavigation } from "expo-router";
import { useContext, useState } from "react";
import { Platform, Text, TouchableOpacity } from "react-native";
import { Modal, StyleSheet, View } from "react-native";
import { AppContext } from "../../store/app-context";
import CreateCategoryOutput from "./CreateCategoryOutput";
import CreateCategorySuccessOutput from "./CreateCategorySuccessOutput";

const InterviewFeedbackButtons = ({ currentQuestionIndex }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const navigation = useNavigation();
  const { setCurrentQuestionIndex, setSelectedCategoryQuestions } =
    useContext(AppContext);

  let categoryOutputScreen = (
    <CreateCategoryOutput
      setModalVisible={setModalVisible}
      setIsSaved={setIsSaved}
      setSelectedCategoryQuestions={setSelectedCategoryQuestions}
      // setItem={setItem}
    />
  );
  if (isSaved) {
    categoryOutputScreen = (
      <CreateCategorySuccessOutput
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
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
            navigation.navigate("InterviewSimulator");
          }}
        >
          <Text style={styles.tryAgainText}>Try Again</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Close modal when back button is pressed
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>{categoryOutputScreen}</View>
        </View>
      </Modal>
    </View>
  );
};

export default InterviewFeedbackButtons;

const styles = StyleSheet.create({
  container: {
    flex: Platform.OS === "ios" ? 1.6 : 1.4,
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
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 6,
    padding: 10,
    width: "48%",
  },
  saveText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  tryAgainButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    borderWidth: 2,
    borderColor: "black",
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
    height: "45%", // Half-screen height for the modal
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

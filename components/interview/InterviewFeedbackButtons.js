import { useNavigation } from "expo-router";
import { useContext, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { AppContext } from "../../store/app-context";
import BackToCategories from "../common/BackToCategories";
import WideButton from "../common/WideButton";
import CreateCategoryOutput from "./CreateCategoryOutput";
import CreateCategorySuccessOutput from "./CreateCategorySuccessOutput";

const InterviewFeedbackButtons = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const navigation = useNavigation();
  const { item, setItem } = useContext(AppContext);

  let categoryOutputScreen = (
    <CreateCategoryOutput
      setModalVisible={setModalVisible}
      setIsSaved={setIsSaved}
      setItem={setItem}
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
      <WideButton
        title="Try again"
        color="white"
        onPress={() => navigation.navigate("InterviewSimulator")}
      />
      <WideButton
        title="Save the questions"
        color="white"
        onPress={() => setModalVisible(true)}
        icon="add-circle-outline"
        size={22}
      />
      <BackToCategories />

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
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end", // Align the modal to the bottom of the screen
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent background
  },
  modalContent: {
    height: "50%", // Half-screen height for the modal
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Alert, Image, Platform, StyleSheet, Text, View } from "react-native";
import { AppContext } from "../../store/app-context";
import SmallButton from "./SmallButton";

const CategoryCard = ({ index, category, categories, setCategories }) => {
  const navigation = useNavigation();
  const {
    resetUriArray,
    setCurrentQuestionIndex,
    selectedCategoryQuestions,
    setSelectedCategoryQuestions,
  } = useContext(AppContext);

  const startInterviewHandler = (index) => {
    navigation.navigate("InterviewSimulator");

    // reset the current question index to 0
    setCurrentQuestionIndex(0);
    // reset the uriArray that is already created
    resetUriArray();
    // Directly access the selected category using the index
    const selectedCategoryObj = categories[index];
    // Extract the array of question texts
    const selectedQuestionTexts = selectedCategoryObj.questions.map(
      (item) => item.question
    );
    setSelectedCategoryQuestions(selectedQuestionTexts);
    // console.log("===> Questions of selected category: ", questionTexts);
  };

  const deleteHandler = (index) => {
    // Create a new array excluding the item at the given index
    const updatedCategories = categories.filter((_, idx) => idx !== index);
    // Update the state with the new array
    setCategories(updatedCategories);
  };

  const deleteAlertHandler = (index) => {
    Alert.alert(
      "Are you sure you want to delete the category?",
      "Deleting the category will remove it permanently and cannot be undone. Please confirm if you want to proceed.",
      [
        {
          text: "Cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteHandler(index);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.cardContainer}>
      <View>
        <View style={styles.imageContainer}>
          <Image source={require("../../assets/images/img.png")} />
          {index >= 3 && (
            <View style={styles.trashIconContainer}>
              <Ionicons
                name="trash"
                color="white"
                size={20}
                style={styles.trashIcon}
                onPress={() => deleteAlertHandler(index)}
              />
            </View>
          )}
        </View>
        <View style={styles.cardBottom}>
          <Text style={styles.categoryText}>{category}</Text>
          <SmallButton
            title="Start"
            color="white"
            onPress={() => startInterviewHandler(index)}
          />
        </View>
      </View>
    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 8,
    margin: 8,
    minWidth: Platform.OS === "ios" ? 150 : 165,
    backgroundColor: "white", // Ensure a background color is set
    // shadow for android
    elevation: 8,
    // shadow for iOS
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.4,
  },
  imageContainer: {
    padding: 0,
    minWidth: 150,
  },
  trashIconContainer: {
    position: "absolute",
    backgroundColor: "black",
    padding: 17,
    borderWidth: 0.5,
    borderRadius: 50,
    right: 8,
    top: 6,
  },
  trashIcon: {
    position: "absolute",
    right: 6.5,
    top: 6.5,
  },
  cardBottom: {
    padding: 5,
    paddingHorizontal: 0,
    justifyContent: "center",
    minWidth: 150,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 9,
    paddingVertical: 2,
  },
});

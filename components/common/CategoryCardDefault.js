import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Alert, Image, ImageBackground, Platform, StyleSheet, Text, View } from "react-native";
import { AppContext } from "../../store/app-context";
import SmallButton from "./SmallButton";

const CategoryCardDefault = ({ index, categoryName, categories, setCategories }) => {
  const navigation = useNavigation();
  const {
    setCurrentQuestionIndex,
    setSelectedCategoryQuestions,
    setQuestionAnswerArray,
  } = useContext(AppContext);

  const startInterviewHandler = (index) => {
    navigation.navigate("InterviewSimulator");

    // reset the current question index to 0
    setCurrentQuestionIndex(0);
    // reset the questionAnswerArray
    setQuestionAnswerArray([]);

    // Directly access the selected category using the index
    const selectedCategoryObj = categories[index];
    // Extract the array of question texts
    const selectedQuestionTexts = selectedCategoryObj.questions.map(
      (item) => item.question
    );
    setSelectedCategoryQuestions(selectedQuestionTexts);
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
      <ImageBackground source={require("../../assets/images/img.png")} style={styles.backgroundImage}>
        <View></View>
        <View style={styles.textAndButtonArea}>
          <View style={styles.textContainer}>
            <Text style={styles.categoryText}>
              {categoryName ? categoryName : "My Occupation"}
            </Text>
          </View>
          <SmallButton
            title={categoryName ? "Start" : "Add"}
            color="white"
            onPress={() => startInterviewHandler(index)}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default CategoryCardDefault;

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: 4,
    marginBottom: 14,
    minWidth: Platform.OS === "ios" ? 150 : 165,
    backgroundColor: "white",
    // shadow for android
    elevation: 4,
    // shadow for iOS
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.3,
  },
  backgroundImage: {
    width: 350,
    height: 110,
    borderRadius: 8,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  textAndButtonArea: {
    padding: 5,
    paddingHorizontal: 0,
    justifyContent: "center",
    width: 150,
  },
  textContainer: {
    paddingHorizontal: 9,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
    height: 47,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

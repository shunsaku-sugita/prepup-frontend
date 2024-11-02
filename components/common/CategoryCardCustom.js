import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useContext} from "react";
import { Alert, Image, Platform, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { AppContext } from "../../store/app-context";
import { deleteInterviewCategory } from "../services/api";
import SmallButton from "./SmallButton";

const CategoryCardCustom = ({ index, categoryName, categories, setCategories, image, backgroundColor }) => {
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

  const deleteHandler = async (index) => {
    const deleteCategoryId = categories[index]._id;
    // try to delete category from database (using API)
    const deleteSuccess = await deleteInterviewCategory(deleteCategoryId);
    console.log("Selected Category ID: " + deleteCategoryId);

    // if successful, update the categories state excluding the selected category at the given index
    if (deleteSuccess) {
      const updatedCategories = categories.filter((_, idx) => idx !== index);
      setCategories(updatedCategories);
    } else {
      Alert.alert("Error", "Failed to delete the category. Please try again.");
    }

    // // Create a new array excluding the item at the given index
    // const updatedCategories = categories.filter((_, idx) => idx !== index);
    // // Update the state with the new array
    // setCategories(updatedCategories);

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
    <View style={[styles.cardContainer, {backgroundColor}]}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
        <View style={styles.trashIconContainer}>
          <Feather
            name="trash"
            color="white"
            size={20}
            style={styles.trashIcon}
            onPress={() => deleteAlertHandler(index)}
          />
        </View>
      </View>
      <View style={styles.cardBottom}>
        <View style={styles.textContainer}>
          <Text style={styles.categoryText}>
            {categoryName}
          </Text>
        </View>

        <SmallButton
          title="Start"
          color="white"
          onPress={() => startInterviewHandler(index)}
        />
      </View>
    </View>
  );
};

export default CategoryCardCustom;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginLeft: 4,
    rowGap: 4,
    // marginBottom: 14,
    minWidth: Platform.OS === "ios" ? 150 : 165,
    height: 220,
    // shadow for android
    elevation: 4,
    // shadow for iOS
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.3,
  },
  imageContainer: {
    flex: 4.5,
    // overflow: 'hidden',
  },
  image: {
    width: 150,
    height: 140,
    // borderRadius: 8,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 8,
  },
  trashIconContainer: {
    position: "absolute",
    backgroundColor: "black",
    padding: 17,
    borderWidth: 0.5,
    borderRadius: 50,
    right: 10,
    top: 8,
  },
  trashIcon: {
    position: "absolute",
    right: 7,
    top: 7,
  },
  cardBottom: {
    flex: 2,
    padding: 8,
    paddingHorizontal: 1,
    paddingVertical: 10,
    justifyContent: "center",
    backgroundColor: 'white',
    width: 150,
    paddingBottom: 26,
    borderBottomRightRadius: 24,
  },
  textContainer: {
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 35,
    marginTop:20,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 9,
    paddingVertical: 2,
  },
});

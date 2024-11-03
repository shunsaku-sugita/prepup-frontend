import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { AppContext } from "../../store/app-context";
import { TouchableOpacity } from "react-native-gesture-handler";

const CategoryCardDefault = ({ index, categoryName, categories, image, backgroundColor }) => {
  const navigation = useNavigation();
  const {
    setCurrentQuestionIndex,
    setSelectedCategoryQuestions,
    setQuestionAnswerArray,
    setProgressUpdate,
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
    // reset the setProgressUpdate to delete previous job questions data (to avoid showing "save" button on feedback)
    // setProgressUpdate(null);
  };

  return (
    <View style={[styles.cardContainer, {backgroundColor}]}>
      <View style={styles.imageContainer}>
        <View style={styles.imageInnerContainer}>
          <Image source={image} style={index === 0 || index === 2 ? styles.image : styles.image1} />
        </View>
      </View>
      <View style={styles.textAndButtonArea}>
        <View style={styles.textContainer}>
          <Text style={styles.categoryText}>
            {/* {categoryName ? categoryName : "My Occupation"} */}
            {categoryName}
          </Text>
        </View>
        <TouchableOpacity style={categoryName !== "My Occupation" ? styles.buttonContainer : styles.addButtonContainer} onPress={categoryName !== "My Occupation" ? () => startInterviewHandler(index) : () => navigation.navigate("Profile")}>
          <Text style={styles.buttonText}>{categoryName !== "My Occupation" ? "Start" : "Add"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CategoryCardDefault;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: 4,
    marginBottom: 14,
    minWidth: Platform.OS === "ios" ? 150 : 165,
    height: 112,
    // shadow for android
    elevation: 3,
    // shadow for iOS
    shadowColor: Colors.textLightDarkGray,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.3,
  },
  imageContainer:  {
    flex: 6,
    backgroundColor: "white",
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 8,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  imageInnerContainer: {
    justifyContent: "center",
    marginTop: 30,
  },
  image: {
    width: '100%',
    height: '160%',
    resizeMode: "contain",
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 10,
  },
  image1: {
    width: '110%',
    height: '100%',
    resizeMode: "contain",
    marginBottom: 40,
  },
  textAndButtonArea: {
    flex: 4.5,
    paddingHorizontal: 0,
    paddingVertical: 10.8,
    justifyContent: "center",
    width: 100,
    backgroundColor: 'white',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 22,
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
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.defaultBlue,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 4,
    marginBottom: 4,
    marginHorizontal: 8,
  },
  addButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.backgroundDarkGray,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 4,
    marginBottom: 4,
    marginHorizontal: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: 'white',
  },
});

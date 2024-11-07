import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useRef, useState } from "react";
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  ScrollView,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { AppContext } from "../../store/app-context";
import { deleteInterviewCategory } from "../services/api";
import SmallButton from "./SmallButton";
import Toast from "react-native-toast-message";

const CategoryCardCustom = ({
  index,
  categoryName,
  customCategories,
  setCustomCategories,
  image,
  backgroundColor,
}) => {
  const navigation = useNavigation();
  const {
    setCurrentQuestionIndex,
    setSelectedCategoryQuestions,
    setQuestionAnswerArray,
  } = useContext(AppContext);

  const scrollAnim = useRef(new Animated.Value(0)).current;
  const [shouldScroll, setShouldScroll] = useState(false);
  const [textHeight, setTextHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    if (textHeight > containerHeight + 2) {
      console.log("containerHeight: " + containerHeight);
      console.log("textHeight: " + textHeight);

      setShouldScroll(true);
      startScrolling();
    } else {
      setShouldScroll(false);
      scrollAnim.stopAnimation();
      scrollAnim.setValue(0); // reset position if no scroll is needed
    }
  }, [textHeight, containerHeight]);

  const startScrolling = () => {
    scrollAnim.setValue(0); // reset position before starting

    Animated.loop(
      Animated.timing(scrollAnim, {
        toValue: -(textHeight - containerHeight), // scroll to the top end
        duration: 7000,
        useNativeDriver: true,
      })
    ).start();
  };

  const startInterviewHandler = (index) => {
    navigation.navigate("InterviewSimulator");

    // reset the current question index to 0
    setCurrentQuestionIndex(0);
    // reset the questionAnswerArray
    setQuestionAnswerArray([]);

    // Directly access the selected category using the index
    const selectedCategoryObj = customCategories[index];
    // Extract the array of question texts
    console.log("selectedCategoryObj: ");
    console.log(selectedCategoryObj);

    const selectedQuestionTexts = selectedCategoryObj.questions.map(
      (item) => item.question
    );
    console.log("selectedQuestionTexts: ");
    console.log(selectedQuestionTexts);

    setSelectedCategoryQuestions(selectedQuestionTexts);
  };

  const deleteHandler = async (index) => {
    const deleteCategoryId = customCategories[index]._id;
    // try to delete category from database (using API)

    const deleteSuccess = await deleteInterviewCategory(deleteCategoryId);
    console.log("Selected Category ID: " + deleteCategoryId);

    // if successful, update the categories state excluding the selected category at the given index
    if (deleteSuccess) {
      const updatedCategories = customCategories.filter(
        (_, idx) => idx !== index
      );
      setCustomCategories(updatedCategories);
      Toast.show({
        type: "success",
        text1: `Category successfully deleted!`,
        text2: "",
        position: "top",
        autoHide: true,
        visibilityTime: 3000,
      });
    } else {
      Toast.show({
        type: "info",
        text1: "Failed to delete a category.",
        text2: "",
        position: "top",
        autoHide: true,
        visibilityTime: 3000,
      });
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
    <View style={[styles.cardContainer, { backgroundColor }]}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
        <TouchableOpacity
          style={styles.trashIconContainer}
          onPress={() => deleteAlertHandler(index)}
        >
          <Feather
            name="trash"
            color="white"
            size={20}
            style={styles.trashIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.cardBottom}>
        <View
          style={styles.textContainer}
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setContainerHeight(height); // measure container height
          }}
        >
          <ScrollView
            contentContainerStyle={styles.scrollView}
            scrollEnabled={true}
          >
            <Animated.View
              style={{
                transform: [{ translateY: shouldScroll ? scrollAnim : 0 }],
              }}
            >
              <Text
                style={styles.categoryText}
                onLayout={(event) => {
                  const { height } = event.nativeEvent.layout;
                  setTextHeight(height); // measure text height
                }}
                // numberOfLines={1}
              >
                {categoryName}
              </Text>
            </Animated.View>
          </ScrollView>
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
    alignItems: "center",
    borderRadius: 8,
    marginLeft: 4,
    rowGap: 4,
    minWidth: Platform.OS === "ios" ? 150 : 165,
    height: 200,
    // shadow for android
    elevation: 2,
    // shadow for iOS
    shadowColor: Colors.textLightDarkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
  },
  imageContainer: {
    flex: 3,
    width: 150,
    height: 130,
  },
  image: {
    width: 150,
    height: 130,
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
    padding: 8,
    paddingHorizontal: 1,
    paddingVertical: 5,
    justifyContent: "center",
    backgroundColor: "white",
    width: 150,
    height: 80,
    paddingBottom: 30,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 8,
  },
  textContainer: {
    justifyContent: "center",
    height: 26,
    width: 138,
    marginTop: 24,
    overflow: "hidden",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 9,
    paddingTop: 4,
  },
});

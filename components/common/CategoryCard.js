import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { AppContext } from "../../store/app-context";
import SmallButton from "./SmallButton";

const CategoryCard = ({ category, index }) => {
  const navigation = useNavigation();
  const startInterviewHandler = () => {
    navigation.navigate("InterviewSimulator");
  };

  const { item, setItem } = useContext(AppContext);

  const deleteHandler = (index) => {
    // Create a new array excluding the item at the given index
    const updatedCategories = item.quizCategories.filter((_, i) => i !== index);

    // Update the state with the new array
    setItem((prevItem) => ({
      ...prevItem,
      quizCategories: updatedCategories,
    }));
  };

  const deleteAlertHandler = (index) => {
    Alert.alert(
      "Are you sure to delete this category card?",
      "The questions saved in the category will be deleted.",
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
        </View>
        <View style={styles.cardBottom}>
          <Text style={styles.categoryText}>{category}</Text>
          <View style={index >= 3 && styles.buttonContainer}>
            <SmallButton
              title="Start"
              color="white"
              onPress={startInterviewHandler}
            />
            {index >= 3 && (
              <Ionicons
                name="trash"
                color="black"
                size={22}
                onPress={() => deleteAlertHandler(index)}
              />
            )}
          </View>
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
    minWidth: 150,
  },
  imageContainer: {
    padding: 0,
    minWidth: 150,
  },
  cardBottom: {
    padding: 6,
    justifyContent: "center",
    minWidth: 150,
  },
  categoryText: {
    fontSize: 16,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

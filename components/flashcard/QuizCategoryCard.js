import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const QuizCategoryCard = ({ category }) => {
  const navigation = useNavigation();
  const startQuizHandler = () => {
    navigation.navigate("QuizScreen");
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={startQuizHandler}>
        <View style={styles.imageContainer}>
          <Image source={require("../../assets/images/img.png")} />
        </View>
        <View style={styles.cardBottom}>
          <Text style={styles.categoryText}>{category}</Text>
          {/* <SmallButton
            title="Start Quiz"
            color="white"
            onPress={startQuizHandler}
          /> */}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default QuizCategoryCard;

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
});

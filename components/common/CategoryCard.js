import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, View } from "react-native";
import SmallButton from "./SmallButton";

const CategoryCard = ({ category }) => {
  const navigation = useNavigation();
  const startInterviewHandler = () => {
    navigation.navigate("InterviewSimulator");
  };

  return (
    <View style={styles.cardContainer}>
      <View>
        <View style={styles.imageContainer}>
          <Image source={require("../../assets/images/img.png")} />
        </View>
        <View style={styles.cardBottom}>
          <Text style={styles.categoryText}>{category}</Text>
          <SmallButton
            title="Start"
            color="white"
            onPress={startInterviewHandler}
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

import { useNavigation } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const BackToCategories = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.textButton}
      onPress={() => navigation.navigate("Category")}
    >
      <Text style={styles.text}>Back to categories</Text>
    </TouchableOpacity>
  );
};

export default BackToCategories;

const styles = StyleSheet.create({
  textButton: {
    marginVertical: 8,
  },
  text: {
    fontSize: 18,
    color: "blue",
  },
});

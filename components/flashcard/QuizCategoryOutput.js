import { useContext } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { AppContext } from "../../store/app-context";
import QuizCategoryCard from "./QuizCategoryCard";

const QuizCategoryOutput = () => {
  const { item, setItem } = useContext(AppContext);
  const categoryData = item.quizCategories;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Category:</Text>
      <FlatList
        data={categoryData}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <QuizCategoryCard category={item} />}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper} // Add spacing between rows
        contentContainerStyle={styles.listContent} // Padding around the list
      />
    </View>
  );
};

export default QuizCategoryOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 2,
  },
  listContent: {
    paddingBottom: 16,
  },
});

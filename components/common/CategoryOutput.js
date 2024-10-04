import { useContext } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { AppContext } from "../../store/app-context";
import CategoryCard from "./CategoryCard";

const CategoryOutput = () => {
  const { item, setItem } = useContext(AppContext);
  const categoryData = item.quizCategories;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Category:</Text>
      <FlatList
        data={categoryData}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <CategoryCard category={item} />}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper} // Add spacing between rows
        contentContainerStyle={styles.listContent} // Padding around the list
      />
    </View>
  );
};

export default CategoryOutput;

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

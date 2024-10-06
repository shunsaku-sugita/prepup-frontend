import { useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { AppContext } from "../../store/app-context";
import CategoryCard from "./CategoryCard";
import TitleText from "./TitleText";

const CategoryOutput = () => {
  const { item, setItem } = useContext(AppContext);
  const categoryData = item.quizCategories;

  return (
    <View style={styles.container}>
      <TitleText text="Choose Category:" />
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
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 2,
  },
  listContent: {
    paddingBottom: 16,
  },
});

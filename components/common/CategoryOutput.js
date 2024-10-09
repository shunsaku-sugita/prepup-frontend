import { useContext } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { AppContext } from "../../store/app-context";
import CategoryCard from "./CategoryCard";
import TitleText from "./TitleText";

const CategoryOutput = () => {
  const { item, setItem } = useContext(AppContext);
  const categoryItems = item.quizCategories;

  return (
    <ScrollView style={styles.container}>
      <TitleText text="Choose Category:" />
      {/* <FlatList
        data={categoryItems}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <CategoryCard categories={item} />}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper} // Add spacing between rows
        contentContainerStyle={styles.listContent} // Padding around the list
      /> */}
      <View style={styles.listContent}>
        {categoryItems.map((category, index) => {
          // For every two items, wrap them in a row
          if (index % 2 === 0) {
            return (
              <View key={index} style={styles.row}>
                <CategoryCard key={index} index={index} category={category} />
                {categoryItems[index + 1] && (
                  <CategoryCard
                    key={index + 1}
                    index={index + 1}
                    category={categoryItems[index + 1]}
                  />
                )}
              </View>
            );
          }
          // Return null for odd index to avoid duplication
          return null;
        })}
      </View>
    </ScrollView>
  );
};

export default CategoryOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 2,
    marginBottom: 8,
  },
});

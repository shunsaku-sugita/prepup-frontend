import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppContext } from "../../store/app-context";
import CategoryCard from "./CategoryCard";
import TitleText from "./TitleText";

// Custom Bottom Tabs Component
const CustomBottomTabs = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.bottomTabContainer}>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => navigation.navigate("JobSearch")}
      >
        <View style={styles.iconContainer}>
          <Ionicons name="briefcase" size={30} color="black" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => navigation.navigate("Flashcard")}
      >
        <View style={styles.iconContainer}>
          <Ionicons name="sparkles" size={30} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const CategoryOutput = () => {
  const { item, setItem } = useContext(AppContext);
  const categoryItems = item.quizCategories;

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <TitleText text="Choose Category:" />
          <View style={styles.listContent}>
            {categoryItems.map((category, index) => {
              // For every two items, wrap them in a row
              if (index % 2 === 0) {
                return (
                  <View key={index} style={styles.row}>
                    <CategoryCard
                      key={index}
                      index={index}
                      category={category}
                    />
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
        </View>
      </ScrollView>
      <CustomBottomTabs />
    </>
  );
};

export default CategoryOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between", // Make sure tabs stay at the bottom
    paddingHorizontal: 18,
  },
  bottomTabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 12,
    borderTopWidth: 0.5,
    borderColor: "#ccc",
    marginBottom: 20,
  },
  iconContainer: {
    borderWidth: 2,
    borderRadius: 50,
    padding: 8,
    marginHorizontal: 18,
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

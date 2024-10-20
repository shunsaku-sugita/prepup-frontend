import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppContext } from "../../store/app-context";
import Greeting from "./Greeting";
import CategoryCard from "./CategoryCard";
import HeaderRightIcons from "./HeaderRightIcons";
import TitleText from "./TitleText";
import { getInterviewCategory } from "../services/api";

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
          <Ionicons name="briefcase" size={30} color="white" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => navigation.navigate("StarQuiz")}
        // onPress={() => navigation.navigate("Flashcard")}
      >
        <View style={styles.iconContainer}>
          <Ionicons name="star" size={30} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const CategoryOutput = () => {
  const { item, setItem } = useContext(AppContext);
  const categoryItems = item.categories;

  // const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   const loadCategories = async () => {
  //     const categoriesData = await getInterviewCategory();
  //     setCategories(categoriesData);
  //     console.log(categories);
  //   };
  //   loadCategories();
  // }, []);

  return (
    <>
      <View style={styles.headerContainer}>
        <Greeting />
        <HeaderRightIcons color="black" />
      </View>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.title}>
            <TitleText text="Choose Category:" />
          </View>
          <View style={styles.listContent}>
            {categoryItems.map((category, index) => {
              // For every two items, wrap them in a row
              if (index % 2 === 0) {
                return (
                  <View key={index} style={styles.row}>
                    <CategoryCard index={index} category={category} />
                    {categoryItems[index + 1] && (
                      <CategoryCard
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
  headerContainer: {
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  container: {
    flex: 1,
    paddingHorizontal: 18,
  },
  title: {
    paddingHorizontal: 8,
  },
  bottomTabContainer: {
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 20,
  },
  iconContainer: {
    borderWidth: 2,
    borderRadius: 50,
    padding: 8,
    marginHorizontal: 18,
    backgroundColor: "black",
    // shadow for android
    elevation: 8,
    // shadow for iOS
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    shadowOpacity: 0.5,
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

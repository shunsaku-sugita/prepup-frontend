import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import Greeting from "./Greeting";
import CategoryCard from "./CategoryCard";
import HeaderRightIcons from "./HeaderRightIcons";
import TitleText from "./TitleText";
import { getInterviewCategory } from "../services/api";
import { AppContext } from "@/store/app-context";

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
      >
        <View style={styles.iconContainer}>
          <Ionicons name="star" size={30} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const CategoryOutput = () => {
  const { categories, setCategories } = useContext(AppContext);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await getInterviewCategory();
      const categoriesData = data.category;
      setCategories(categoriesData);
    };
    loadCategories();
  }, []);

  return (
    <>
      <View style={styles.headerContainer}>
        <Greeting />
        <HeaderRightIcons color="black" />
      </View>
      <View style={styles.container}>
        <View style={styles.title}>
          <TitleText text="Choose Category:" />
        </View>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.categoryName}
          numColumns={2}
          renderItem={({ item, index }) => (
            <View style={styles.cardContainer}>
              <CategoryCard
                index={index}
                category={item.categoryName}
                categories={categories}
                setCategories={setCategories}
              />
            </View>
          )}
        />
      </View>
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
    shadowRadius: 4,
    shadowOpacity: 0.4,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 2,
    marginBottom: 8,
  },
});

import { Ionicons } from "@expo/vector-icons";
import Octicons from '@expo/vector-icons/Octicons'; 
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Greeting from "./Greeting";
import CategoryCardCustom from "./CategoryCardCustom";
import CategoryCardDefault from "./CategoryCardDefault";
import HeaderRightIcons from "./HeaderRightIcons";
import TitleText from "./TitleText";
import { getInterviewCategory, getProfile } from "../services/api";
import { AppContext } from "@/store/app-context";
import Svg, { Defs, Rect, LinearGradient, Stop } from 'react-native-svg';
import { Colors } from "@/constants/Colors";

// Custom Bottom Tabs Component
const CustomBottomTabs = () => {
  const { setAnswers } = useContext(AppContext);
  const navigation = useNavigation();

  return (
    <View style={styles.bottomTabContainer}>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => navigation.navigate("JobSearch")}
      >
        <View style={styles.iconContainer}>
          <Ionicons name="briefcase" size={25} color="white" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => {
          // reset the input field of STAR master
          setAnswers((prevAnswers) => ({
            ...prevAnswers,
            situation: "",
            task: "",
            action: "",
            result: "",
          }));

          // navigete to the STAR master screen
          navigation.navigate("StarQuiz");
        }}
      >
        <View style={styles.iconContainer}>
          <Octicons name="star-fill" size={25} color="white" />
          {/* <Ionicons name="star" size={30} color="white" /> */}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const CategoryOutput = () => {
  const { categories, setCategories } = useContext(AppContext);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      const data = await getInterviewCategory();
      const categoriesData = data.category;
      setCategories(categoriesData);

      const userData = await getProfile();
      setUserName(userData.givenName);
      // console.log(categories);
    };
    loadCategories();
  }, []);

  // default category card
  const renderDefaultCategoryCard = ({ item, index }) => (
    <View style={styles.defaultCardContainer}>
      <CategoryCardDefault
        index={index}
        categoryName={item.categoryName}
        categories={categories}
        setCategories={setCategories}
      />
    </View>
  );

  // custom category card
  const renderCustomCategoryCard = ({ item, index }) => (
    <View style={styles.customCardContainer}>
      <CategoryCardCustom
        index={index}
        categoryName={item.categoryName}
        categories={categories}
        setCategories={setCategories}
      />
    </View>
  );

  return (
    <View style={styles.rootContainer}>
      {/* header bar */}
      <View style={styles.headerContainer}>
        <Svg height="100%" width="100%">
          <Defs>
            <LinearGradient id="grad" x1="0%" x2="100%" y1="0%" y2="0%">
              <Stop offset="0" stopColor={Colors.onPressBlue} />
              <Stop offset="1" stopColor={Colors.disabledBlue} />
            </LinearGradient>
          </Defs>
          <Rect width="100%" height="50" fill="url(#grad)" rx="16" ry="16" />
        </Svg>
        <View style={styles.headerInnerContainer}>
          <Greeting userName={userName} />
          <HeaderRightIcons color="black" />
        </View>
      </View>

      {/* default category cards (wide) */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item.categoryName}
        ListHeaderComponent={
          <View style={styles.upperTextContainer}>
            <View style={styles.title}>
              <TitleText text="Choose a category to practice:" />
            </View>
          </View>
        }
        renderItem={renderDefaultCategoryCard}
        // custom category cards (swipable)
        ListFooterComponent={
          <View style={styles.bottomCardContainer}>
            <View style={styles.title}>
              <TitleText text="Custom categories:" />
            </View>
            <FlatList
              data={categories.slice(0, 5)} // display only the first 5 items
              keyExtractor={(item) => item.categoryName}
              renderItem={renderCustomCategoryCard}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        }
      />
      <CustomBottomTabs />
    </View>

        /* <View style={styles.headerContainer}>
          <Svg height="100%" width="100%">
            <Defs>
              <LinearGradient id="grad" x1="0%" x2="100%" y1="0%" y2="0%">
                <Stop offset="0" stopColor="#1E22ED" />
                <Stop offset="1" stopColor="#C5D2FF" />
              </LinearGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#grad)" rx="16" ry="16" />
            <View style={styles.headerInnerContainer}>
              <Greeting userName={userName} />
              <HeaderRightIcons color="black" />
            </View>
          </Svg>
        </View>

        <ScrollView>
          {/* default category cards (wide) */
          /* <View style={styles.upperTextContainer}>
            <View style={styles.title}>
              <TitleText text="Choose a category to practice:" />
            </View>
            <FlatList
              data={categories}
              keyExtractor={(item) => item.categoryName}
              renderItem={({ item, index }) => (
                <View style={styles.defaultCardContainer}>
                  <CategoryCardDefault
                    index={index}
                    categoryName={item.categoryName}
                    categories={categories}
                    setCategories={setCategories}
                  />
                </View>
              )}
            />
          </View> */
          /* custom category cards (swipable) */
          /* <View style={styles.bottomContainer}>
            <View style={styles.title}>
              <TitleText text="Custom categories:" />
            </View>
            <FlatList
              data={categories}
              keyExtractor={(item) => item.categoryName}
              renderItem={({ item, index }) => (
                <View style={styles.customCardContainer}>
                  <CategoryCardCustom
                    index={index}
                    categoryName={item.categoryName}
                    categories={categories}
                    setCategories={setCategories}
                  />
                </View>
              )}
              horizontal={true}
            />
          </View>
        </ScrollView>
        <CustomBottomTabs />
      </View> */
  );
};

export default CategoryOutput;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    width: "100%",
  },
  headerContainer: {
    marginTop: 58,
    marginHorizontal: 18,
    // justifyContent: "space-between",
    height: 50,
  },
  headerInnerContainer: {
    flexDirection: "row",
    marginTop: 5,
    marginLeft: 3,
    position: 'absolute',
  },
  upperTextContainer: {
    flex: 6,
    justifyContent: 'center',
    alignItems: "flex-start",
    paddingHorizontal: 18,
    marginTop: 6,
  },
  bottomCardContainer: {
    flex: 4,
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
    paddingVertical: 12,
    marginBottom: 16,
  },
  iconContainer: {
    borderWidth: 2,
    borderRadius: 50,
    padding: 12,
    marginHorizontal: 18,
    backgroundColor: "black",
    // shadow for android
    elevation: 4,
    // shadow for iOS
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.4,
  },
  defaultCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 18,
  },
  customCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 16,
    paddingBottom: 4,
  },
});

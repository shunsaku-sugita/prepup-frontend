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
  const [isOccupation, setIsOccupation] = useState(false);
  const [userName, setUserName] = useState("");

  // fixed colors for default cards (limits 3)
  const defaultBackgroundColors = [Colors.disabledBlue, Colors.defaultRed, Colors.defaultYellow]; 
  // cycling colors for custom cards (3 colors for 5 cards)
  const customBackgroundColors = [Colors.disabledYellow, Colors.disabledRed, Colors.disabledBlue];   

  // fixed images for default cards (limits 3)
  const defaultImages = [
    require("../../assets/images/onboarding-two.png"),
    require("../../assets/images/onboarding-three.png"),
    require("../../assets/images/registration-success.png")
  ];  
  // fixed images for custom cards (limits 5)
  const customImages = [
    require("../../assets/images/CustomCategory-Image1.png"),
    require("../../assets/images/CustomCategory-Image2.png"),
    require("../../assets/images/CustomCategory-Image3.png"),
    require("../../assets/images/CustomCategory-Image4.png"),
    require("../../assets/images/CustomCategory-Image5.png")
  ];  

  useEffect(() => {
    const loadCategories = async () => {
      const data = await getInterviewCategory();
      // console.log(data);
      const categoriesData = data.category;
      const occupationFlag = data.occupation;  // true or false
      if (occupationFlag) {
        setIsOccupation(true);
      }

      // ensure there are always 3 items
      let updatedCategories = [...categoriesData];

      console.log("Raw data: " + updatedCategories);

      if (updatedCategories.length < 3) {
        if (!occupationFlag) {
          // insert "My Occupation" as the first item if occupation is false
          updatedCategories.unshift({ categoryName: "My Occupation", questions: [] });
        }
      }

      console.log("Updated Categories:", updatedCategories); // Debugging: check updated categories

      setCategories(categoriesData);

      // load user data
      const userData = await getProfile();
      setUserName(userData.givenName);
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
        isOccupation={isOccupation}
        image={defaultImages[index]}
        backgroundColor={defaultBackgroundColors[index]}
      />
    </View>
  );

  // custom category card
  const renderCustomCategoryCard = ({ item, index }) => (
    // cycling colors by using %(Modulo operation)
    <View style={styles.customCardContainer}> 
      <CategoryCardCustom
        index={index}
        categoryName={item.categoryName}
        categories={categories}
        setCategories={setCategories}
        image={customImages[index]}
        backgroundColor={customBackgroundColors[index % customBackgroundColors.length]}
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
              <Stop offset="0" stopColor={Colors.headerBlue} />
              <Stop offset="1" stopColor={Colors.disabledBlue} />
            </LinearGradient>
          </Defs>
          <Rect width="100%" height="50" fill="url(#grad)" rx="16" ry="16" />
        </Svg>
        <View style={styles.headerInnerContainer}>
          <Greeting userName={userName} />
          <HeaderRightIcons color={Colors.backgroundDarkGray} />
        </View>
      </View>

      {/* Default category cards (scrollable with fixed height) */}
      <View style={styles.defaultCategoryContainer}>
        <FlatList
          data={categories.slice(0, 3)}
          keyExtractor={(item, index) => item.categoryName + index}
          ListHeaderComponent={
            <View style={styles.upperTextContainer}>
              <View style={styles.title}>
                <TitleText text="Choose a category to practice:" />
              </View>
            </View>
          }
          renderItem={renderDefaultCategoryCard}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Custom category cards (only if there are more than 3 categories) */}
      {categories.length > 3 && (
      <View style={styles.bottomCardContainer}>
        <View style={styles.title}>
          <TitleText text="Custom categories:" />
        </View>
        <FlatList
          data={categories.slice(3)} // display items from the 4th onward
          keyExtractor={(item, index) => item.categoryName + index + 3}
          renderItem={renderCustomCategoryCard}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      )}
      
      {/* default category cards (wide)
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
      /> */}
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
    marginTop: 60,
    marginHorizontal: 18,
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
  defaultCategoryContainer: {
    // height: 410,
    // marginBottom: 4,
  },
  defaultCardContainer: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    marginHorizontal: 18,
  },
  customCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 12,
    paddingBottom: 4,
  },
});

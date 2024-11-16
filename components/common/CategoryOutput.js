import { Ionicons } from "@expo/vector-icons";
import Octicons from "@expo/vector-icons/Octicons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useContext, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
} from "react-native";
import Greeting from "./Greeting";
import CategoryCardCustom from "./CategoryCardCustom";
import CategoryCardDefault from "./CategoryCardDefault";
import TitleText from "./TitleText";
import { getInterviewCategory, getProfile } from "../services/api";
import { AppContext } from "@/store/app-context";
// import Svg, { Defs, Rect, LinearGradient, Stop } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";

// Custom Bottom Tabs Component
const CustomBottomTabs = () => {
  const { setAnswers } = useContext(AppContext);
  const navigation = useNavigation();

  return (
    <View style={styles.bottomTabContainer}>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => navigation.navigate("JobFinder")}
      >
        <View style={styles.jobFinderIconContainer}>
          <Ionicons name="briefcase" size={23} color="white" />
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
          navigation.navigate("StarMaster");
        }}
      >
        <View style={styles.starMasterIconContainer}>
          <Octicons name="star-fill" size={23} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const CategoryOutput = () => {
  const { categories, setCategories } = useContext(AppContext);
  const [userName, setUserName] = useState("");
  const [userInitials, setUserInitials] = useState("");
  const [customCategories, setCustomCategories] = useState([]);

  const navigation = useNavigation();

  // fixed colors for default cards (limits 3)
  const defaultBackgroundColors = [
    Colors.disabledBlue,
    Colors.defaultRed,
    Colors.defaultYellow,
  ];
  // cycling colors for custom cards (3 colors for 5 cards)
  const customBackgroundColors = [
    Colors.disabledYellow,
    Colors.disabledRed,
    Colors.disabledBlue,
  ];

  // fixed images for default cards (limits 3)
  const defaultImages = [
    require("../../assets/images/onboarding-two.png"),
    require("../../assets/images/onboarding-three.png"),
    require("../../assets/images/registration-success.png"),
  ];
  // fixed images for custom cards (limits 5)
  const customImages = [
    require("../../assets/images/CustomCategory-Image1.png"),
    require("../../assets/images/CustomCategory-Image2.png"),
    require("../../assets/images/CustomCategory-Image3.png"),
    require("../../assets/images/CustomCategory-Image4.png"),
    require("../../assets/images/CustomCategory-Image5.png"),
  ];

  useFocusEffect(
    useCallback(() => {
      const loadCategories = async () => {
        const data = await getInterviewCategory();
        console.log("Data from the category output =====> " + data);

        const categoriesData = data.category;
        const occupationFlag = data.occupation;

        // create copy of categoriesData(array of objects)
        let updatedCategories = [...categoriesData];

        if (!occupationFlag) {
          // insert "My Occupation" as the first item if occupation is false
          updatedCategories.unshift({
            categoryName: "My Occupation",
            questions: [],
            score: [],
            _id: "",
            badge: "",
          });
        }
        setCategories(updatedCategories);

        if (updatedCategories.length > 3) {
          setCustomCategories(updatedCategories.slice(3));
        }

        // load user data
        const userData = await getProfile();
        setUserName(userData.givenName);
        setUserInitials(userData.initials);
      };

      loadCategories();

      // Optional cleanup
      return () => {
        // Any cleanup actions if needed
      };
    }, []) // Empty dependency array to run this only on screen focus
  );

  // default category card
  const renderDefaultCategoryCard = ({ item, index }) => (
    <View style={styles.defaultCardContainer}>
      <CategoryCardDefault
        index={index}
        categoryName={item.categoryName}
        categories={categories}
        setCategories={setCategories}
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
        customCategories={customCategories}
        setCustomCategories={setCustomCategories}
        image={customImages[index]}
        backgroundColor={
          customBackgroundColors[index % customBackgroundColors.length]
        }
      />
    </View>
  );

  return (
    <View style={styles.rootContainer}>
      {/* header bar */}
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[Colors.headerBlue, Colors.disabledBlue]}
        style={styles.linearGradient}
      >
        <View style={styles.headerInnerContainer}>
          <Greeting userName={userName} />
          <TouchableOpacity
            style={styles.userIconContainer}
            onPress={() => navigation.navigate("Profile")}
          >
            <Text style={styles.userIconText}>{userInitials}</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView>
        {/* Default category cards (scrollable with fixed height) */}
        <View style={styles.defaultCategoryContainer}>
          <FlatList
            data={categories.slice(0, 3)}
            keyExtractor={(item, index) => item.categoryName + index}
            ListHeaderComponent={
              <View style={styles.upperTextContainer}>
                <View style={styles.titleContainer}>
                  <TitleText text="Choose a category to practice:" />
                </View>
              </View>
            }
            renderItem={renderDefaultCategoryCard}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
        {/* Custom category cards (only if there are more than 3 categories) */}
        <View style={styles.customTitleContainer}>
          <TitleText text="Custom categories:" />
        </View>
        {customCategories.length > 0 ? (
          <View style={styles.bottomCardContainer}>
            <FlatList
              data={customCategories} // display items from the 4th onward
              keyExtractor={(item, index) => item.categoryName + index + 3}
              renderItem={renderCustomCategoryCard}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        ) : (
          <View style={styles.customPlaceholderContainer}>
            <Image
              source={require("../../assets/images/logo-gray.png")}
              style={styles.graylogo}
            />
            <Text style={styles.customPlaceholderText}>
              Your custom categories will go here!
            </Text>
          </View>
        )}
      </ScrollView>
      <CustomBottomTabs />
    </View>
  );
};

export default CategoryOutput;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    width: "100%",
  },
  linearGradient: {
    marginTop: 60,
    marginHorizontal: 18,
    borderRadius: 18,
    justifyContent: "center",
    height: 58,
  },
  headerInnerContainer: {
    flexDirection: "row",
    marginTop: 5,
    marginLeft: 3,
    position: "absolute",
  },
  upperTextContainer: {
    flex: 6,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 18,
    marginTop: 6,
  },
  bottomCardContainer: {
    flex: 3.5,
    paddingHorizontal: 18,
  },
  titleContainer: {
    paddingHorizontal: 4,
  },
  customTitleContainer: {
    paddingHorizontal: 21,
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
    pointerEvents: "box-none",
  },
  jobFinderIconContainer: {
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginHorizontal: 18,
    backgroundColor: Colors.lightBlack,
    // shadow for android
    elevation: 4,
    // shadow for iOS
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.4,
  },
  starMasterIconContainer: {
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginHorizontal: 18,
    backgroundColor: Colors.lightBlack,
    // shadow for android
    elevation: 4,
    // shadow for iOS
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.4,
  },
  defaultCategoryContainer: {},
  defaultCardContainer: {
    marginHorizontal: 18,
  },
  customCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 12,
    paddingBottom: 4,
  },
  userIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 15,
    backgroundColor: Colors.backgroundDarkGray,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  userIconText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  customPlaceholderContainer: {
    marginHorizontal: 22,
    width: "88.8%",
    height: 200,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    // shadow for android
    elevation: 3,
    // shadow for iOS
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
  },
  graylogo: {
    width: 57,
    height: 70,
  },
  customPlaceholderText: {
    fontSize: 16,
    fontFamily: "MavenPro-SemiBold",
    marginTop: 14,
    color: Colors.placeHolderTextGray,
  },
});

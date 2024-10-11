import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import IconButton from "./IconButton";

const HeaderRightIcons = ({ color }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerRightContainer}>
      <IconButton
        icon="notifications-outline"
        color={color}
        size={30}
        onPress={() => navigation.navigate("Notifications")}
      />
      <IconButton
        icon="person-circle-outline"
        color={color}
        size={30}
        onPress={() => navigation.navigate("Profile")}
      />
    </View>
  );
};

export default HeaderRightIcons;

const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: "row",
    columnGap: 10,
    paddingRight: 18,
  },
});

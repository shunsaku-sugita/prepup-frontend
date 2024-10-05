import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import IconButton from "../common/IconButton";

const InterviewControllerIcons = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View>
        <IconButton
          icon="volume-medium-outline"
          color="black"
          size={35}
          onPress={() => {
            null;
          }}
        />
      </View>
      <View>
        <IconButton
          icon="mic"
          color="black"
          size={70}
          onPress={() => {
            null;
          }}
        />
      </View>
      <View>
        <IconButton
          icon="chevron-forward"
          color="black"
          size={30}
          onPress={() => {
            navigation.navigate("InterviewFeedback");
          }}
        />
      </View>
    </View>
  );
};

export default InterviewControllerIcons;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: 360,
    marginBottom: 6,
    // borderWidth: 1,
    // borderRadius: 12,
  },
});

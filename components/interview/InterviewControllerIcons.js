import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import IconButton from "../common/IconButton";

const InterviewControllerIcons = () => {
  return (
    <View style={styles.container}>
      <View>
        <IconButton
          icon="volume-medium-outline"
          color="black"
          size={40}
          onPress={() => {
            null;
          }}
        />
      </View>
      <View>
        <IconButton
          icon="mic-circle-outline"
          color="black"
          size={65}
          onPress={() => {
            null;
          }}
        />
      </View>
      <View>
        <IconButton
          icon="chevron-forward"
          color="black"
          size={35}
          onPress={() => {
            null;
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

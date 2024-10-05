import { StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";

const ProgressBar = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>1/5</Text>
      <Progress.Bar
        progress={0.2} // sets the progress by %
        width={330}
        height={16}
        color="black"
        unfilledColor="#eee"
        borderWidth={0}
        borderRadius={20}
      />
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    flexDirection: "row",
    columnGap: 8,
    marginBottom: 16,
    width: 360,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
});

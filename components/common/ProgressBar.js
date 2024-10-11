import { StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";

const ProgressBar = ({ number }) => {
  const num = Number(number);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>1/{num}</Text>
      <Progress.Bar
        progress={1 / num} // sets the progress by %
        width={300}
        height={16}
        color="black"
        unfilledColor="#eee"
        borderWidth={0}
        borderRadius={40}
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
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
});

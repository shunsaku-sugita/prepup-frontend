import { StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";

const ProgressBar = ({ currentIndexNum, totalNum }) => {
  const currentIndex = Number(currentIndexNum + 1);
  const totalNumber = Number(totalNum);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {currentIndex}/{totalNumber}
      </Text>
      <Progress.Bar
        progress={currentIndex / totalNumber} // sets the progress by %
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

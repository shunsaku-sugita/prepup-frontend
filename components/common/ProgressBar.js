import { StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";
import { Colors } from "@/constants/Colors";
import { useContext } from "react";
import { AppContext } from "@/store/app-context";

const ProgressBar = ({ currentIndexNum, totalNum }) => {
  const { fontsLoaded } = useContext(AppContext);

  const currentIndex = Number(currentIndexNum + 1);
  const totalNumber = Number(totalNum);

  if (!fontsLoaded) {
    return null; // return null if fonts aren't loaded
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {currentIndex}/{totalNumber}
      </Text>
      <Progress.Bar
        progress={currentIndex / totalNumber} // sets the progress by %
        width={300}
        height={12}
        color={Colors.onPressBlue}
        unfilledColor={Colors.disabledBlue}
        borderWidth={0}
        borderRadius={40}
      />
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    flex: 0.4,
    flexDirection: "row",
    columnGap: 8,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontFamily: "MavenPro-Medium",
  },
});

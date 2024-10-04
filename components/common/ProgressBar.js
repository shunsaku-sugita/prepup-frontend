import { StyleSheet, Text, View } from "react-native";

const ProgressBar = () => {
  return (
    <View style={styles.container}>
      <Text>1/5</Text>
      <Text>ProgressBar</Text>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    width: 360,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
  },
});

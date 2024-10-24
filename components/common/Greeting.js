import { StyleSheet, Text, View } from "react-native";

const Greeting = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Hello User</Text>
    </View>
  );
};

export default Greeting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 18,
  },
  titleText: {
    fontSize: 20,
  },
});

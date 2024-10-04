import { StyleSheet, Text, View } from "react-native";

const CreateCategory = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>CreateCategory</Text>
    </View>
  );
};

export default CreateCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
  },
});

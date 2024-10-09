import { StyleSheet, Text, View } from "react-native";

const TitleText = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{text}</Text>
    </View>
  );
};

export default TitleText;

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 8,
  },
});

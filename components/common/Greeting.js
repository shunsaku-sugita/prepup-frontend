import { StyleSheet, Text, View, Image } from "react-native";

const Greeting = ({ userName }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/images/logo-color.png")}
      />
      <Text style={styles.titleText}>
        Hello,{" "}
        <Text style={styles.userNameText}>{userName ? userName : "User"}!</Text>
      </Text>
    </View>
  );
};

export default Greeting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginLeft: 10,
  },
  image: {
    width: 24,
    height: 24,
  },
  titleText: {
    fontSize: 20,
    color: "white",
  },
  userNameText: {
    fontWeight: "600",
  },
});

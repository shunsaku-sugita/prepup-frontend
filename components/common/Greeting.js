import { AppContext } from "@/store/app-context";
import { useContext } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const Greeting = ({ userName }) => {
  const { fontsLoaded } = useContext(AppContext);
  if (!fontsLoaded) {
    return null; // return null if fonts aren't loaded
  }
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/images/PrepUp-Logo-COLORED.png")}
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
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: 10,
    columnGap: 6,
  },
  image: {
    width: 22,
    height: 22,
  },
  titleText: {
    fontSize: 18,
    color: "white",
    fontFamily: "MavenPro",
  },
  userNameText: {
    fontFamily: "MavenPro-Bold",
  },
});

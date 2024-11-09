import { AppContext } from "@/store/app-context";
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

const TitleText = ({ text }) => {
  const { fontsLoaded } = useContext(AppContext);
  if (!fontsLoaded) {
    return null; // return null if fonts aren't loaded
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{text}</Text>
    </View>
  );
};

export default TitleText;

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    marginVertical: 8,
    fontFamily: "MavenPro-Bold",
  },
});

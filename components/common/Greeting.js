import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppContext } from "../../store/app-context";

const Greeting = () => {
  const { item, setItem } = useContext(AppContext);
  const userName = item.userName;

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Hello {userName ? userName : "User"}</Text>
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

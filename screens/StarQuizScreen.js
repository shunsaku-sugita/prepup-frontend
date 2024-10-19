import { StyleSheet, Text, View } from "react-native";
import React from "react";
import StarQuizOutput from "../components/starquiz/StarQuizOutput";

const StarMasterScreen = () => {
  return (
    <View style={styles.container}>
      <StarQuizOutput />
    </View>
  );
};

export default StarMasterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

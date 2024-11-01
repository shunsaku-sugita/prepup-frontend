import { StyleSheet, Text, View } from "react-native";
import React from "react";
import StarQuizOutput from "../components/starquiz/StarQuizOutput";
import { Colors } from "@/constants/Colors";

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
    backgroundColor: Colors.defaultBeige,
    alignItems: "center",
    justifyContent: "center",
  },
});

import { StyleSheet, View } from "react-native";
import React from "react";
import StarMasterOutput from "../components/starmaster/StarMasterOutput";
import { Colors } from "@/constants/Colors";

const StarMasterScreen = () => {
  return (
    <View style={styles.container}>
      <StarMasterOutput />
    </View>
  );
};

export default StarMasterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.disabledBeige,
    alignItems: "center",
    justifyContent: "center",
  },
});

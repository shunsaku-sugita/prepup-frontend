import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CategoryOutput from "../components/common/CategoryOutput";
import { Colors } from "@/constants/Colors";

const CategoryScreen = () => {
  return (
    <View style={styles.container}>
      <CategoryOutput />
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultBeige,
  },
  text: {
    fontSize: 24,
  },
});

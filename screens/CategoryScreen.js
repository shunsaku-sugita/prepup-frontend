import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CategoryOutput from "../components/common/CategoryOutput";

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
    backgroundColor: "#fff",
    // paddingHorizontal: 18,
  },
  text: {
    fontSize: 24,
  },
});

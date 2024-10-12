import { StyleSheet, Text, View } from "react-native";
import React from "react";

const JobFilterBar = (props) => {
  return (
    <View style={styles.container}>
      <Text onPress={() => props.changeFilter(1)}>Filter By Location</Text>
      <Text onPress={() => props.changeFilter(0)}>Saved Jobs</Text>
    </View>
  );
};

export default JobFilterBar;

const styles = StyleSheet.create({
  container: {
    display:"flex",
    flexDirection:"row",
      gap: 10
  },
  text: {
    fontSize: 24,
  },
});

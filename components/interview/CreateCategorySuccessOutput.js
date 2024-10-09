import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import TitleText from "../common/TitleText";
import WideButton from "../common/WideButton";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const CreateCategorySuccessOutput = ({ modalVisible, setModalVisible }) => {
  const navigation = useNavigation();

  // onPress function

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.closeIcon}>
          <Ionicons
            name="close"
            color="black"
            size={28}
            onPress={() => setModalVisible(!modalVisible)}
          />
        </View>
        <View style={styles.titleWrapper}>
          <TitleText text="Create a Category" />
        </View>
        <View style={styles.textWrapper}>
          <TitleText text="Category card has been successfully added!" />
        </View>
        <View style={styles.button}>
          <WideButton
            title="Back to category board"
            color="white"
            onPress={() => navigation.navigate("Category")}
            size={24}
          />
        </View>
        <View style={styles.linkText}>
          <TouchableOpacity
            style={styles.textButton}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CreateCategorySuccessOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 40,
  },
  innerContainer: {
    justifyContent: "center",
  },
  closeIcon: {
    alignItems: "flex-end",
  },
  titleWrapper: {
    marginBottom: 8,
  },
  textWrapper: {
    marginBottom: 10,
    alignItems: "center",
  },
  button: {
    marginVertical: 16,
  },
  linkText: {
    alignItems: "center",
  },
  textButton: {
    marginVertical: 8,
  },
  cancelText: {
    fontSize: 18,
  },
});

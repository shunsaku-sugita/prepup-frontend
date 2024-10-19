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
        <View style={styles.iconWrapper}>
          <Ionicons name="checkmark-circle" color="black" size={50} />
        </View>
        <View style={styles.textWrapper}>
          <TitleText text="Category board has been successfully added!" />
        </View>
        <View style={styles.button}>
          <WideButton
            title="Back to Category"
            color="white"
            onPress={() => navigation.navigate("Category")}
            size={24}
          />
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
    marginTop: 20,
  },
  innerContainer: {
    justifyContent: "center",
  },
  closeIcon: {
    alignItems: "flex-end",
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },
  textWrapper: {
    marginBottom: 10,
    alignItems: "center",
  },
  button: {
    marginVertical: 16,
  },
  textButton: {
    marginVertical: 8,
  },
});

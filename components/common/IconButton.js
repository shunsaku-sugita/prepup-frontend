import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";

const IconButton = ({ icon, color, size, display, onPress }) => {
  const navigation = useNavigation();
  // Check if the icon is from MaterialIcons or Ionicons
  const IconComponent = icon === "record-voice-over" ? MaterialIcons : Ionicons;

  return (
    <TouchableOpacity
      onPress={onPress ? onPress : navigation.goBack}
      disabled={display && display}
      style={styles.container}
    >
      <IconComponent name={icon} color={color} size={size} />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6, // Increase padding to make the touchable area larger
    paddingHorizontal: 6,
    borderRadius: 20, // Optional: Adds a little roundness to the touchable area
    justifyContent: "center",
    alignItems: "center",
  },
});

import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

const WideButton = ({ title, color, onPress, icon, size }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      {icon && <Ionicons name={icon} color={color} size={size} />}
      <Text style={[styles.buttonText, { color: color }]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default WideButton;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 8,
    backgroundColor: "black",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: 340,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

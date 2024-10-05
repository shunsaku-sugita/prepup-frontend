import { Button, StyleSheet, Text, TouchableOpacity } from "react-native";

const SmallButton = ({ title, color, onPress }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Text style={[styles.buttonText, { color: color }]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SmallButton;

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 4,
    marginBottom: 4,
    marginHorizontal: 8,
  },
  buttonText: {
    fontSize: 16,
  },
});

import { Button, StyleSheet, TouchableOpacity } from "react-native";

const WideButton = ({ title, color, onPress }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer}>
      <Button title={title} color={color} onPress={onPress} />
    </TouchableOpacity>
  );
};

export default WideButton;

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 8,
    marginTop: 4,
    marginBottom: 2,
  },
});

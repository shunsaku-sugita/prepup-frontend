import { Button, StyleSheet, TouchableOpacity } from "react-native";

const SmallButton = ({ title, color, onPress }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer}>
      <Button title={title} color={color} onPress={onPress} />
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
    marginTop: 4,
    marginBottom: 2,
    marginHorizontal: 8,
  },
});

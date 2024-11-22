import { Colors } from "@/constants/Colors";
import { AppContext } from "@/store/app-context";
import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const SmallButton = ({ title, color, onPress }) => {
  const { fontsLoaded } = useContext(AppContext);
  if (!fontsLoaded) {
    return null; // return null if fonts aren't loaded
  }
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
    backgroundColor: Colors.defaultBlue,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 4,
    marginBottom: 4,
    marginHorizontal: 8,
    width: "90%",
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Mulish-ExtraBold",
  },
});

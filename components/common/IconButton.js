import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";

const IconButton = ({ icon, color, size, onPress, recordingUri }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={onPress ? onPress : navigation.goBack}>
      <Ionicons
        name={icon}
        color={color}
        size={size}
        disabled={!recordingUri && true}
      />
    </TouchableOpacity>
  );
};

export default IconButton;

// const styles = StyleSheet.create({});

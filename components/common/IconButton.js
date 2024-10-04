import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";

const IconButton = ({ icon, color, size, onPress }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={onPress ? onPress : navigation.goBack}>
      <Ionicons name={icon} color={color} size={size} />
    </TouchableOpacity>
  );
};

export default IconButton;

// const styles = StyleSheet.create({});

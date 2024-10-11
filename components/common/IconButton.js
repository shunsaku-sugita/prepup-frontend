import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";

const IconButton = ({ icon, color, size, onPress, boolean }) => {
  const navigation = useNavigation();
  // Check if the icon is from MaterialIcons or Ionicons
  const IconComponent = icon === "record-voice-over" ? MaterialIcons : Ionicons;

  return (
    <TouchableOpacity
      onPress={onPress ? onPress : navigation.goBack}
      disabled={boolean}
    >
      <IconComponent name={icon} color={color} size={size} />
    </TouchableOpacity>
  );
};

export default IconButton;

// const styles = StyleSheet.create({});

import { Colors } from "@/constants/Colors";
import { ActivityIndicator, StyleSheet, View } from "react-native";
Colors

const LoadingOverlay = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.defaultBlue} />
    </View>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },
});

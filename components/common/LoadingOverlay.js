import { Colors } from "@/constants/Colors";
import { ActivityIndicator, StyleSheet, View, Image } from "react-native";
Colors

const LoadingOverlay = () => {
  return (
    <View style={styles.container}>
      <Image
          source={require("../../assets/images/PrepUp-Logo-COLORED.png")}
          style={styles.image}
        />
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
  image: {
    width: 130,
    height: 130,
  },
});

import { Colors } from "@/constants/Colors";
import { ActivityIndicator, StyleSheet, View, Image } from "react-native";
import { Video } from "expo-av";
import { useRef } from "react";

const LoadingOverlay = () => {
  const videoRef = useRef(null);
  return (
    <View style={styles.container}>
      {/* <Video
        source={require("../../assets/videos/PrepUp-Preloader-V1.mp4")}
        style={styles.video}
        resizeMode={"cover"}
        shouldPlay
        isLooping
        isMuted
        ref={videoRef}
        onLoad={() => {
          console.log("Video loaded");
        }}
        onError={(error) => {
          console.error("Video loading error:", error);
        }}
      /> */}
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
  video: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  image: {
    width: 130,
    height: 130,
  },
});

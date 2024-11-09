import { Colors } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";
import { Video } from "expo-av";
import { useRef } from "react";

const LoadingOverlay = () => {
  const videoRef = useRef(null);
  return (
    <View style={styles.container}>
      <Video
        source={require("../../assets/videos/PrepUp-Preloader-White.mp4")}
        style={styles.video}
        resizeMode="contain"
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
      />
    </View>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
    width: "100%",
  },
  video: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
});

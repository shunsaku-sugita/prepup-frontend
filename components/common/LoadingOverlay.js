import { Colors } from "@/constants/Colors";
import { ActivityIndicator, StyleSheet, View, Image } from "react-native";
import { Video } from "expo-av";
import { useRef } from "react";

const LoadingOverlay = () => {
  const videoRef = useRef(null);
  return (
    <View style={styles.container}>
      <Video
        source={require("../../assets/videos/PrepUp-Preloader-V2.mp4")}
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
    backgroundColor: Colors.disabledBeige,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
    width: "100%",
  },
  video: {
    backgroundColor: Colors.disabledBeige,
    width: "100%",
    height: "100%",
  },
});

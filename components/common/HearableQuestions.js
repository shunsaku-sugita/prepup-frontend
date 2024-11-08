import { useContext, useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Animated } from "react-native";
import IconButton from "./IconButton";
import * as Speech from "expo-speech";
import LoadingOverlay from "./LoadingOverlay";
import { Colors } from "@/constants/Colors";
import { AppContext } from "@/store/app-context";

const HearableQuestions = ({ questionText }) => {
  const scrollAnim = useRef(new Animated.Value(0)).current;
  const [shouldScroll, setShouldScroll] = useState(false);
  const [textHeight, setTextHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const { fontsLoaded } = useContext(AppContext);

  // To manage initial delay and interval for the scrolling behavior
  const initialDelay = 7000; // 7 seconds initial delay
  const scrollInterval = 7000; // 7 seconds interval between scroll cycles
  const scrollDuration = 10000; // 10 seconds scroll duration

  useEffect(() => {
    let delayTimeout, intervalId;

    const startScrollAnimation = () => {
      scrollAnim.setValue(0); // Reset scroll position

      Animated.timing(scrollAnim, {
        toValue: -(textHeight - containerHeight), // Scroll distance
        duration: scrollDuration,
        useNativeDriver: true,
      }).start(() => {
        scrollAnim.setValue(0); // Reset to starting position
      });
    };

    if (textHeight > containerHeight) {
      setShouldScroll(true);
      // Start with the initial delay, then proceed with interval-based scrolls
      delayTimeout = setTimeout(() => {
        startScrollAnimation();
        intervalId = setInterval(
          startScrollAnimation,
          scrollDuration + scrollInterval
        );
      }, initialDelay);
    } else {
      setShouldScroll(false);
      scrollAnim.setValue(0);
    }
    // Cleanup on questionText change or component unmount
    return () => {
      clearTimeout(delayTimeout);
      clearInterval(intervalId);
      scrollAnim.stopAnimation();
    };
  }, [textHeight, containerHeight, questionText]);

  const speakHandler = async () => {
    const speaking = await Speech.isSpeakingAsync();

    if (!speaking && !isPlaying) {
      // Start speaking the current question
      Speech.speak(questionText, {
        // Reset state when speech is finished
        onDone: () => setIsPlaying(false),
      });
      setIsPlaying(true); // Mark as playing
    } else if (speaking) {
      // Stop the speech
      Speech.stop();
      setIsPlaying(false); // Reset the state to not playing
    }
  };

  if (!fontsLoaded) {
    return null; // return null if fonts aren't loaded
  }

  return (
    <View style={styles.container}>
      <View style={styles.questionIconContainer}>
        <IconButton
          icon={isPlaying ? "stop-circle-outline" : "play-circle"}
          color={Colors.backgroundDarkGray}
          size={45}
          onPress={speakHandler}
        />
      </View>
      <View
        style={styles.questionTextContainer}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setContainerHeight(height); // measure container height
        }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollView}
          scrollEnabled={true}
        >
          <Animated.View
            style={{
              transform: [{ translateY: shouldScroll ? scrollAnim : 0 }],
            }}
          >
            <Text
              style={styles.questionText}
              onLayout={(event) => {
                const { height } = event.nativeEvent.layout;
                setTextHeight(height); // measure text height
              }}
            >
              {questionText}
            </Text>
          </Animated.View>
        </ScrollView>
      </View>
    </View>
  );
};

export default HearableQuestions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 15,
    marginBottom: 16,
    width: "95%",
  },
  questionIconContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  questionTextContainer: {
    flex: 7,
    justifyContent: "center",
    alignItems: "flex-start",
    height: 120,
    overflow: "hidden",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
  },
  questionText: {
    fontSize: 20,
    fontFamily: "MavenPro-Bold",
    color: Colors.lightBlack,
  },
});

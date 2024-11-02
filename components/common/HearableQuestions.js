import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Animated } from "react-native";
import IconButton from "./IconButton";
import * as Speech from "expo-speech";
import LoadingOverlay from "./LoadingOverlay";
import { Colors } from "@/constants/Colors";

const HearableQuestions = ({ questionText }) => {
  const scrollAnim = useRef(new Animated.Value(0)).current;
  const [shouldScroll, setShouldScroll] = useState(false);
  const [textHeight, setTextHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (textHeight > containerHeight) {
      console.log("containerHeight: " + containerHeight);
      console.log("textHeight: " + textHeight);

      setShouldScroll(true);
      startScrolling();
    } else {
      setShouldScroll(false);
      scrollAnim.stopAnimation();
      scrollAnim.setValue(0); // reset position if no scroll is needed
    }
  }, [textHeight, containerHeight]);

  const startScrolling = () => {
    scrollAnim.setValue(0); // reset position before starting

    Animated.loop(
      Animated.timing(scrollAnim, {
        toValue: -(textHeight - containerHeight), // scroll to the top end
        duration: 7000,
        useNativeDriver: true,
      })
    ).start();
  };

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

  return (
    <>
      {questionText ? (
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
            }}>
            <ScrollView contentContainerStyle={styles.scrollView} scrollEnabled={false} >
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
                  }}>{questionText}</Text>
              </Animated.View>
            </ScrollView>
          </View>
        </View>
      ) : (
        <LoadingOverlay />
      )}
    </>
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
    height: 95,
    overflow: 'hidden',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
  },
  questionText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.lightBlack,
  },
});

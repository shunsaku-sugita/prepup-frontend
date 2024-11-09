import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import StarMasterFeedbackRatingDisplay from "./StarMasterFeedbackRatingDisplay";
import { Colors } from "@/constants/Colors";
import { AppContext } from "@/store/app-context";

const StarMasterFeedbackIconRatings = ({ starMasterFeedback }) => {
  const [ratingStarNumber, setRatingStarNumber] = useState(0);
  const [ratingPhrase, setRatingPhrase] = useState("");
  const { fontsLoaded } = useContext(AppContext);

  const ratingPhrases = ["Keep Trying!", "Well Done!", "Impressive Work!"];

  // feedback average score
  const averageScore = starMasterFeedback.score;

  useEffect(() => {
    calcStarRating();
  }, [averageScore]);

  const calcStarRating = () => {
    let stars = 0;
    if (averageScore < 10) stars = 0.5;
    else if (averageScore >= 10 && averageScore < 20) stars = 1;
    else if (averageScore >= 20 && averageScore < 30) stars = 1.5;
    else if (averageScore >= 30 && averageScore < 40) stars = 2;
    else if (averageScore >= 40 && averageScore < 50) stars = 2.5;
    else if (averageScore >= 50 && averageScore < 60) stars = 3;
    else if (averageScore >= 60 && averageScore < 70) stars = 3.5;
    else if (averageScore >= 70 && averageScore < 80) stars = 4;
    else if (averageScore >= 80 && averageScore < 90) stars = 4.5;
    else if (averageScore >= 90 && averageScore <= 100) stars = 5;

    setRatingStarNumber(stars);
    selectPhrase(stars);
  };

  // 0-59%: Keep Trying / 60-89%: Well done / 90-100%: Impressive work
  const selectPhrase = (stars) => {
    if (stars < 3.5) setRatingPhrase(ratingPhrases[0]);
    else if (stars >= 3.5 && stars < 5) setRatingPhrase(ratingPhrases[1]);
    else if (stars === 5) setRatingPhrase(ratingPhrases[2]);
  };

  if (!fontsLoaded) {
    return null; // return null if fonts aren't loaded
  }

  return (
    <View style={styles.container}>
      <View style={styles.phraseContainer}>
        <Text style={styles.phrase}>{ratingPhrase}</Text>
      </View>
      <View>
        <StarMasterFeedbackRatingDisplay rating={ratingStarNumber} />
      </View>
    </View>
  );
};

export default StarMasterFeedbackIconRatings;

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: Colors.disabledBeige,
    alignItems: "center",
    rowGap: 30,
    marginTop: 20,
  },
  phraseContainer: {},
  phrase: {
    fontSize: 28,
    fontFamily: "MavenPro-Bold",
    color: Colors.backgroundDarkGray,
    marginVertical: 10,
  },
});

import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import TitleText from "../common/TitleText";
import StarRating from "react-native-star-rating-widget";

const StarQuizFeedbackIconRatings = ({ starMasterFeedback }) => {
  const [ratingStarNumber, setRatingStarNumber] = useState(0);
  const [ratingPhrase, setRatingPhrase] = useState("");

  const ratingPhrases = ["Keep Trying!", "Well Done!", "Impressive Work!"];

  // feedback average score
  const averageScore = starMasterFeedback.score;

  useEffect(() => {
    calcStarRating();
    selectPrase();
  }, []);

  const calcStarRating = () => {
    if (averageScore < 10) {
      setRatingStarNumber(0.5);
    } else if (averageScore >= 10 && averageScore < 20) {
      setRatingStarNumber(1);
    } else if (averageScore >= 20 && averageScore < 30) {
      setRatingStarNumber(1.5);
    } else if (averageScore >= 30 && averageScore < 40) {
      setRatingStarNumber(2);
    } else if (averageScore >= 40 && averageScore < 50) {
      setRatingStarNumber(2.5);
    } else if (averageScore >= 50 && averageScore < 60) {
      setRatingStarNumber(3);
    } else if (averageScore >= 60 && averageScore < 70) {
      setRatingStarNumber(3.5);
    } else if (averageScore >= 70 && averageScore < 80) {
      setRatingStarNumber(4);
    } else if (averageScore >= 80 && averageScore < 90) {
      setRatingStarNumber(4.5);
    } else if (averageScore >= 90 && averageScore <= 100) {
      setRatingStarNumber(5);
    }
    return;
  };

  // 0-59%: Keep Trying / 60-89%: Well done / 90-100%: Impressive work
  const selectPrase = () => {
    if (ratingStarNumber <= 3) {
      setRatingPhrase(ratingPhrases[0]);
    } else if (ratingStarNumber >= 3.5 && ratingStarNumber <= 4.5) {
      setRatingPhrase(ratingPhrases[1]);
    } else if (ratingStarNumber === 5) {
      setRatingPhrase(ratingPhrases[2]);
    }
    return;
  };

  return (
    <View style={styles.container}>
      <TitleText text={ratingPhrase} />
      <View>
        <StarRating
          // required props: rating and onChange
          rating={ratingStarNumber}
          onChange={() => setRatingStarNumber(ratingStarNumber)}
          color="black"
        />
      </View>
    </View>
  );
};

export default StarQuizFeedbackIconRatings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

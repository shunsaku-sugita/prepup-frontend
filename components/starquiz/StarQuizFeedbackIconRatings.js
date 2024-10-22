import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import TitleText from "../common/TitleText";
import StarRating from "react-native-star-rating-widget";

const StarQuizFeedbackIconRatings = () => {
  const [rating, setRating] = useState(1.5);
  const ratingPhrases = [
    "Keep Trying!",
    "Nice Work!",
    "Well Done!",
    "Excellent!!",
  ];

  const [situationRating, setSituationRating] = useState(0);
  const [taskRating, setTaskRating] = useState(0);
  const [actionRating, setActionRating] = useState(0);
  const [resultRating, setResultRating] = useState(0);

  const [averageRating, setAverageRating] = useState(0);

  // useEffect(() => {
  // fetch first

  // }, []);

  // const calcAverageRating = (
  //   situationRating,
  //   taskRating,
  //   actionRating,
  //   resultRating
  // ) => {
  //   return setAverageRating((situationRating + taskRating + actionRating + resultRating) / 4);
  // };

  // if (averageRating < 10) {
  //   setRating(0.5);
  // } else if (averageRating >= 10 && averageRating < 20) {
  //   setRating(1);
  // } else if (averageRating >= 20 && averageRating < 30) {
  //   setRating(1.5);
  // } else if (averageRating >= 30 && averageRating < 40) {
  //   setRating(2);
  // } else if (averageRating >= 40 && averageRating < 50) {
  //   setRating(2.5);
  // } else if (averageRating >= 50 && averageRating < 60) {
  //   setRating(3);
  // } else if (averageRating >= 60 && averageRating < 70) {
  //   setRating(3.5);
  // } else if (averageRating >= 70 && averageRating < 80) {
  //   setRating(4);
  // } else if (averageRating >= 80 && averageRating < 90) {
  //   setRating(4.5);
  // } else if (averageRating >= 90 && averageRating < 100) {
  //   setRating(5);
  // }

  let ratingPhraseText = ratingPhrases[0];
  // if (rating <= 2) {
  //   ratingPhraseText = ratingPhrases[0];
  // } else if (rating === 2.5 && rating === 3) {
  //   ratingPhraseText = ratingPhrases[1];
  // } else if (rating === 3.5 && rating === 4) {
  //   ratingPhraseText = ratingPhrases[2];
  // } else if (rating === 4.5 && rating === 5) {
  //   ratingPhraseText = ratingPhrases[3];
  // }

  return (
    <View style={styles.container}>
      <TitleText text={ratingPhraseText} />
      <View style={styles.starRatingContainer}>
        <StarRating
          // required props: rating and onChange
          rating={rating}
          onChange={() => setRating(rating)}
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
  starRatingContainer: {},
});

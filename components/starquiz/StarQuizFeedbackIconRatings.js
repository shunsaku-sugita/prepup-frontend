import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import TitleText from "../common/TitleText";
import StarRating from "react-native-star-rating-widget";

const StarQuizFeedbackIconRatings = () => {
  const [rating, setRating] = useState(4);

  return (
    <View style={styles.container}>
      <TitleText text="Well Done!" />
      <View style={styles.starRatingContainer}>
        <StarRating rating={rating} onChange={setRating} color="black" />
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

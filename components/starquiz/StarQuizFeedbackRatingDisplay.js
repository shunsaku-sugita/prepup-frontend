import React from 'react';
import { View, StyleSheet } from 'react-native';
import Octicons from '@expo/vector-icons/Octicons'; // full star
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'; // half 
import { Colors } from '@/constants/Colors';

const StarQuizFeedbackRatingDisplay = ({ rating }) => {
  const maxStars = 5;
  const stars = [];

  for (let i = 1; i <= maxStars; i++) {
    if (rating >= i) {
      // Full star
      stars.push(<View key={`full-${i}`} style={styles.fullStarContainer}><Octicons name="star-fill" size={50} color={Colors.defaultYellow} /></View>);
    } else if (rating >= i - 0.5) {
      // Half star
      stars.push(<FontAwesome5 key={`half-${i}`} name="star-half-alt" size={46} color={Colors.defaultYellow} />);
    } else {
      // Empty star
      stars.push(
        <FontAwesome5 key={`empty-${i}`} name="star" size={46} color={Colors.defaultYellow} />
      );
    }
  }
  return <View style={styles.container}>{stars}</View>;
};

export default StarQuizFeedbackRatingDisplay;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: "center",
    columnGap: 20,
  },
  fullStarContainer: {
    marginTop: 5,
    marginHorizontal: 2,
  }
});
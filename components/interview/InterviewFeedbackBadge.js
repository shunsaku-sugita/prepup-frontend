import { Image, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";

const InterviewFeedbackBadge = ({ analyzedAnswer }) => {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [badgeImage, setBadgeImage] = useState(null);

  useEffect(() => {
    const badgeText = analyzedAnswer.badge;

    if (badgeText === "Bronze") {
      setBackgroundImage(
        <Image
          source={require("../../assets/images/bronze-background.png")}
          style={styles.badgeBackgroundImage}
        />
      );
      setBadgeImage(
        <Image
          source={require("../../assets/images/bronze-badge.png")}
          style={styles.badgeImage}
        />
      );
    } else if (badgeText === "Silver") {
      setBackgroundImage(
        <Image
          source={require("../../assets/images/silver-background.png")}
          style={styles.badgeBackgroundImage}
        />
      );
      setBadgeImage(
        <Image
          source={require("../../assets/images/silver-badge.png")}
          style={styles.badgeImage}
        />
      );
    } else if (badgeText === "Gold") {
      setBackgroundImage(
        <Image
          source={require("../../assets/images/gold-background.png")}
          style={styles.badgeBackgroundImage}
        />
      );
      setBadgeImage(
        <Image
          source={require("../../assets/images/gold-badge.png")}
          style={styles.badgeImage}
        />
      );
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.badgeArea}>
        {backgroundImage}
        {badgeImage}
      </View>
    </View>
  );
};

export default InterviewFeedbackBadge;

const styles = StyleSheet.create({
  container: {
    flex: 2.5,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeArea: {
    width: 400,
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 95,
  },
  badgeBackgroundImage: {
    position: "absolute",
    width: 400,
    height: 300,
  },
  badgeImage: {
    marginTop: 130,
    width: 200,
    height: 230,
  },
});

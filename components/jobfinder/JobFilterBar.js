import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors"; // Make sure your Colors file is correctly imported.

const JobFilterBar = ({ changeFilter, filterType }) => {
  return (
    <View style={styles.container}>
      {/* Job List Button */}
      <TouchableOpacity
        style={[
          styles.tab, 
          filterType === 1 ? styles.activeTab : styles.inactiveTab // Conditional styling for selected tab
        ]}
        onPress={() => changeFilter(1)}
      >
        <Text
          style={[
            styles.tabText, 
            filterType === 1 ? styles.activeTabText : styles.inactiveTabText // Conditional text styling for selected tab
          ]}
        >
          Job List
        </Text>
      </TouchableOpacity>

      {/* Saved Jobs Button */}
      <TouchableOpacity
        style={[
          styles.tab, 
          filterType === 0 ? styles.activeTab : styles.inactiveTab // Conditional styling for selected tab
        ]}
        onPress={() => changeFilter(0)}
      >
        <Text
          style={[
            styles.tabText, 
            filterType === 0 ? styles.activeTabText : styles.inactiveTabText // Conditional text styling for selected tab
          ]}
        >
          Saved Jobs
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default JobFilterBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 3,
    borderBottomColor: Colors.onPressBlue,
    marginBottom: 20,
   
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: "center",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  activeTab: {
    backgroundColor: Colors.onPressBlue, // Blue background when selected
  },
  inactiveTab: {
    backgroundColor: "#EFEFEF", // Grayish background for unselected tab
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
  },
  activeTabText: {
    color: "#FFFFFF", 
  },
  inactiveTabText: {
    color: "#5C5C5C", 
  },
});

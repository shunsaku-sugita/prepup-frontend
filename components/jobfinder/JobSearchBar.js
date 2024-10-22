import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const JobSearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <View style={styles.searchContainer}>
      <Ionicons
        name="search"
        size={24}
        color="black"
        style={styles.searchIcon}
      />

      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onFocus={() => {}}
      />

      {searchQuery ? (
        <TouchableOpacity onPress={() => setSearchQuery("")}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default JobSearchBar;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 8,
    padding: 10,

    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  searchIcon: {
    paddingRight: 8,
  },
});

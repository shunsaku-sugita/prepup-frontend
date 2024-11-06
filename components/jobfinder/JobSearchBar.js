import { StyleSheet, TextInput, View, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from '@expo/vector-icons';

const JobSearchBar = ({ searchQuery, setSearchQuery }) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchSubmit = () => {
    setIsLoading(true);
    setSearchQuery(localQuery);
  };

  const handleClearSearch = () => {
    setLocalQuery("");
    setSearchQuery("");
  };

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Jobs"
        value={localQuery}
        onChangeText={(text) => {
          setLocalQuery(text);
        }}
        placeholderTextColor="#4D63B5"
        onSubmitEditing={handleSearchSubmit} // Handle "Enter" key press
        returnKeyType="search"
      />

      {isLoading ? (
        <ActivityIndicator size="small" color="#4D63B5" style={styles.icon} />
      ) : localQuery ? (
        <TouchableOpacity onPress={handleClearSearch}>
          <Ionicons name="close" size={20} color="#4D63B5" style={styles.icon} />
        </TouchableOpacity>
      ) : (
        <Ionicons name="search" size={20} color="#4D63B5" style={styles.icon} />
      )}
    </View>
  );
};

export default JobSearchBar;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: '#4D63B5',
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    paddingRight: 10,
    fontSize: 16,
    color: "#4D63B5"
  },
  icon: {
    paddingLeft: 10,
  },
});

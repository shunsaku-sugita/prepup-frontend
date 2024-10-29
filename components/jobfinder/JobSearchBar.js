import { StyleSheet, TextInput, View, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from '@expo/vector-icons';

const JobSearchBar = ({ searchQuery, setSearchQuery }) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [isTyping, setIsTyping] = useState(false);

  // Function to handle when the user presses the enter key
  const handleSearchSubmit = () => {
    setIsTyping(false); 
    setSearchQuery(localQuery); 
  };

  // Function to clear the search bar
  const handleClearSearch = () => {
    setLocalQuery(""); 
    setSearchQuery(""); 
  };

  useEffect(() => {
    setLocalQuery(searchQuery); // Keep local state in sync with parent state changes
  }, [searchQuery]);

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Jobs"
        value={localQuery}
        onChangeText={(text) => {
          setLocalQuery(text);
          setIsTyping(true); // Indicate that typing is happening
        }}
        placeholderTextColor="#4D63B5"
        onSubmitEditing={handleSearchSubmit} // Handle "Enter" key press
        returnKeyType="search"
      />

      {isTyping ? (
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
    color:"#4D63B5"
  },
  icon: {
    paddingLeft: 10,
  },
});

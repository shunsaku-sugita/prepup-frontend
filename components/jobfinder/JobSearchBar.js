import { StyleSheet, TextInput, View, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from '@expo/vector-icons';

const JobSearchBar = ({ searchQuery, setSearchQuery }) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setSearchQuery(localQuery); // Update parent searchQuery after debounce
      setIsTyping(false);
    }, 500); // 500ms delay

    return () => clearTimeout(delayDebounce); // Clear the timeout if the user types within 500ms
  }, [localQuery, setSearchQuery]); // Include dependencies here

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Jobs"
        value={localQuery} // Use localQuery here
        onChangeText={(text) => {
          setLocalQuery(text);
          setIsTyping(true);
        }}
        placeholderTextColor="#4D63B5"
      />

      {isTyping ? (
        <ActivityIndicator size="small" color="#4D63B5" style={styles.icon} />
      ) : localQuery ? (
        <TouchableOpacity onPress={() => setLocalQuery('')}>
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
    flexDirection: 'row',
    alignItems: 'center',
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

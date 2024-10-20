import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from '@expo/vector-icons';

const JobSearchBar = ({searchQuery, setSearchQuery}) => {
  return (
    <View style={styles.searchContainer}>

      <TextInput
        style={styles.searchInput}
        placeholder="Search Jobs"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onFocus={() => {
        }}
      
      />

{searchQuery ? (
        <TouchableOpacity onPress={() => setSearchQuery('')}>
          <Ionicons name="close" size={24} color="black" style={styles.icon} />
        </TouchableOpacity>
      ) : (
        <Ionicons name="search" size={24} color="black" style={styles.icon} />
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
    borderColor: 'black',
    borderRadius: 8,
    padding: 8,
  
    marginBottom: 10, 
  },
  searchInput: {
    flex: 1,
    paddingRight: 10,
    fontSize: 16,
  },
  icon: {
    paddingLeft: 10,
    
  },
});

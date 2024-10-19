import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const FilterTags = ({ activeFilter, setActiveFilter }) => {
  const filters = ['Remote', 'Vancouver', 'Calgary', 'London'];

  return (
    <View style={styles.filterContainer}>
      {filters.map((filter, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.filterTag,
            activeFilter === filter ? styles.activeFilterTag : null,
          ]}
          onPress={() => setActiveFilter(filter)}
        >
          <Text
            style={[
              styles.filterText,
              activeFilter === filter ? styles.activeFilterText : null,
            ]}
          >
            {filter}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10, 
    padding: 10
  },
  filterTag: {
    backgroundColor: '#C0C0C0',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  activeFilterTag: {
    backgroundColor: 'black',
    borderColor: 'white',
  },
  filterText: {
    color: '#000',
  },
  activeFilterText: {
    color: '#fff',
  },
});

export default FilterTags;

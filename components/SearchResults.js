import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import HomeIndexStyles from "../Styles/HomeIndexStyles";

const SearchResults = ({ results, onItemPress, onClearSearch }) => {
  const router = useRouter();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => onItemPress(item)}
    >
      <Text style={styles.resultName}>{item.name}</Text>
      <Text style={styles.resultCuisine}>{item.cuisines}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[HomeIndexStyles.searchResultsContainer, styles.container]}>
      <View style={styles.header}>
        <Text style={styles.title}>Search Results</Text>
        <TouchableOpacity onPress={onClearSearch}>
          <AntDesign name="close" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        ListEmptyComponent={<Text style={styles.emptyText}>No results found</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  list: {
    maxHeight: 300,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  resultName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultCuisine: {
    fontSize: 14,
    color: '#666',
  },
  emptyText: {
    padding: 20,
    textAlign: 'center',
    color: '#666',
  },
});

export default SearchResults;


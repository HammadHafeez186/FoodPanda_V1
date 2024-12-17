import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const Categories = ({ categories, selectedCategory, onSelectCategory }) => {
  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item.name && styles.selectedCategoryButton
      ]}
      onPress={() => onSelectCategory(selectedCategory === item.name ? null : item.name)}
    >
      <Text style={[
        styles.categoryText,
        selectedCategory === item.name && styles.selectedCategoryText
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  categoryButton: {
    padding: 10,
    marginRight: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  selectedCategoryButton: {
    backgroundColor: '#FF2B85',
  },
  categoryText: {
    color: 'black',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: 'white',
  },
});

export default Categories;


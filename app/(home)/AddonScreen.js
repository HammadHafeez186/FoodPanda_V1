import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Pressable,
  TouchableHighlight
} from 'react-native';

const AddonScreen = ({ navigation }) => {
  const [addonData, setAddonData] = useState([]);
  const [selectedAddons, setSelectedAddons] = useState({});
  const [expandedCategories, setExpandedCategories] = useState({});

  useEffect(() => {
    fetchAddonData();
  }, []);

  const fetchAddonData = async () => {
    try {
      const response = await fetch('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Addon-PZS6GVl9EgmYq0NUKGGuQKFccf7Iib.json');
      const data = await response.json();
      setAddonData(data);
    } catch (error) {
      console.error('Error fetching addon data:', error);
    }
  };

  const toggleAddon = (item) => {
    setSelectedAddons(prev => {
      const newSelectedAddons = { ...prev };
      if (newSelectedAddons[item.id]) {
        delete newSelectedAddons[item.id];
      } else {
        newSelectedAddons[item.id] = item;
      }
      return newSelectedAddons;
    });
  };

  const toggleCategoryExpansion = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const renderAddonItem = (item) => (
    <TouchableOpacity
      key={`addon-${item.id}`}
      style={[
        styles.addonItem,
        selectedAddons[item.id] && styles.selectedAddon
      ]}
      onPress={() => toggleAddon(item)}
    >
      <Image source={{ uri: item.image }} style={styles.addonImage} />
      <Text style={styles.addonName}>{item.name}</Text>
      <Text style={styles.addonPrice}>₹{item.price.toFixed(2)}</Text>
      {item.veg && <Text style={styles.vegIcon}>🟢</Text>}
      {item.bestSeller && <Text style={styles.bestSellerBadge}>Best Seller</Text>}
      <Text style={styles.addonRating}>★ {item.rating} ({item.ratings})</Text>
    </TouchableOpacity>
  );

  const renderAddonCategory = ({ item: category }) => {
    const isExpanded = expandedCategories[category.id];
    const displayItems = isExpanded ? category.addons : category.addons.slice(0, 3);

    return (
      <View key={category.id} style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>{category.name}</Text>
        <View style={styles.addonGridContainer}>
          {displayItems.map((item) => renderAddonItem(item))}
        </View>
        
        {category.addons.length > 3 && (
          <Pressable onPress={() => toggleCategoryExpansion(category.id)}>
            <Text style={styles.viewAllText}>
              {isExpanded ? 'Show Less' : 'View All'}
            </Text>
          </Pressable>
        )}
      </View>
    );
  };

  const handleDone = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={addonData}
        keyExtractor={(item) => item.id}
        renderItem={renderAddonCategory}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableHighlight 
        style={styles.doneButton} 
        underlayColor="#FF5733"
        onPress={handleDone}
      >
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingVertical: 50,
    paddingHorizontal: 15
  },
  listContainer: {
    paddingBottom: 100
  },
  categoryContainer: {
    marginVertical: 10
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 15,
    marginBottom: 10
  },
  addonGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingHorizontal: 15
  },
  addonItem: {
    width: '45%',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    backgroundColor: 'white'
  },
  selectedAddon: {
    borderColor: '#FF6B6B',
    backgroundColor: '#FFF5F5'
  },
  addonImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 5
  },
  addonName: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center'
  },
  addonPrice: {
    marginTop: 3,
    color: '#888'
  },
  vegIcon: {
    position: 'absolute',
    top: 5,
    left: 5,
    fontSize: 12
  },
  bestSellerBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#FFD700',
    padding: 2,
    borderRadius: 3,
    fontSize: 10,
    fontWeight: 'bold'
  },
  addonRating: {
    marginTop: 3,
    fontSize: 12,
    color: '#FFA500'
  },
  viewAllText: {
    color: 'blue', 
    textAlign: 'right', 
    marginTop: 10,
    marginRight: 15
  },
  doneButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 15,
    position: 'absolute',
    bottom: 20,
    left: 15,
    right: 15
  },
  doneButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default AddonScreen;
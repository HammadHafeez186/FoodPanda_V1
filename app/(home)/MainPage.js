import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, Alert, FlatList, TextInput, TouchableOpacity, Image, Modal, TouchableWithoutFeedback } from "react-native";
import * as Location from "expo-location";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Octicons from "@expo/vector-icons/Octicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { supabase } from "../../lib/supabase";
import { useRouter } from "expo-router";
import { useIsFocused } from '@react-navigation/native';
import HomeIndexStyles from "../../Styles/HomeIndexStyles";
import restaurantData from "../../data/dataRestaurantMenu.json";
import categoriesData from '../../data/categoriesData.json';
import Hotels from "../../components/Hotels";
import Categories from '../../components/Categories';
import Carousel from '../../components/Carousel';
import CartButton from '../../components/CartButton';
import SearchResults from '../../components/SearchResults';
import UserProfileFetcher from '../../components/userProfileFetcher';
import { useSelector } from 'react-redux';
import items from '../../data/items.json';

const HomeIndex = () => {
    const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
    const [displayCurrentAddress, setDisplayCurrentAddress] = useState("Waiting for Current Location....");
    const [userId, setUserId] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filteredRestaurants, setFilteredRestaurants] = useState(restaurantData.restaurants);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const searchInputRef = useRef(null);
    const router = useRouter();
    const isFocused = useIsFocused();
    const cart = useSelector((state) => state.cart.items);

    useEffect(() => {
        checkIfLocationEnabled();
        getCurrentLocation();
        fetchUserData();
    }, []);

    useEffect(() => {
        if (userId && isFocused) {
            fetchUserAddresses();
        }
    }, [userId, isFocused]);

    useEffect(() => {
        if (addresses.length > 0) {
            loadSelectedAddress();
        } else {
            setDisplayCurrentAddress("Waiting for Current Location....");
        }
    }, [addresses]);

    useEffect(() => {
        filterRestaurants(selectedCategory, searchQuery);
    }, [selectedCategory, searchQuery]);

    const checkIfLocationEnabled = async () => {
        const enabled = await Location.hasServicesEnabledAsync();
        setLocationServicesEnabled(enabled);
        if (!enabled) {
            Alert.alert(
                "Location Services not enabled",
                "This app requires access to your location.",
                [{ text: "OK", cancelable: false }]
            );
        }
    };

    const getCurrentLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            Alert.alert(
                "Permission not granted",
                "Allow the app to use location service.",
                [{ text: "OK", cancelable: false }]
            );
            return;
        }

        const { coords } = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        if (coords) {
            const { latitude, longitude } = coords;
            const response = await Location.reverseGeocodeAsync({ latitude, longitude });

            const address = response[0];
            const addressText = address
                ? `${address.name || ""}, ${address.city || ""}`
                : "Address not found";

            setDisplayCurrentAddress(addressText);
        }
    };

    const fetchUserData = useCallback(async () => {
        try {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) throw error;
            if (user) {
                setUserId(user.id);
            }
        } catch (error) {
            console.error("Error fetching user data:", error.message);
        }
    }, []);

    const fetchUserAddresses = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from("user_addresses")
                .select("*")
                .eq("user_id", userId);
            if (error) throw error;
            setAddresses(data || []);
        } catch (error) {
            console.error("Error fetching user addresses:", error.message);
        } finally {
            setIsLoading(false);
        }
    }, [userId]);

    const loadSelectedAddress = useCallback(async () => {
        try {
            const savedAddressId = await AsyncStorage.getItem('selectedAddressId');
            if (savedAddressId !== null && addresses.length > 0) {
                const selectedAddress = addresses.find(addr => addr.address_id.toString() === savedAddressId);
                if (selectedAddress) {
                    setSelectedAddressId(savedAddressId);
                    setDisplayCurrentAddress(selectedAddress.street + ", " + selectedAddress.city);
                } else {
                    setSelectedAddressId(addresses[0].address_id.toString());
                    setDisplayCurrentAddress(addresses[0].street + ", " + addresses[0].city);
                }
            } else if (addresses.length > 0) {
                setSelectedAddressId(addresses[0].address_id.toString());
                setDisplayCurrentAddress(addresses[0].street + ", " + addresses[0].city);
            } else {
                setSelectedAddressId(null);
                getCurrentLocation();
            }
        } catch (error) {
            console.error("Error loading selected address:", error);
        }
    }, [addresses]);

    const saveSelectedAddress = useCallback(async (addressId) => {
        try {
            await AsyncStorage.setItem('selectedAddressId', addressId.toString());
        } catch (error) {
            console.error("Error saving selected address:", error);
        }
    }, []);

    const deleteAddress = useCallback(async (addressId) => {
        try {
            const { error } = await supabase
                .from("user_addresses")
                .delete()
                .eq("address_id", addressId);
            if (error) throw error;

            setAddresses((prevAddresses) => prevAddresses.filter((item) => item.address_id !== addressId));
            Alert.alert("Success", "Address deleted successfully!");

            if (addressId.toString() === selectedAddressId) {
                if (addresses.length > 1) {
                    const newSelectedAddress = addresses.find(addr => addr.address_id.toString() !== addressId.toString());
                    if (newSelectedAddress) {
                        setSelectedAddressId(newSelectedAddress.address_id.toString());
                        setDisplayCurrentAddress(newSelectedAddress.street + ", " + newSelectedAddress.city);
                        saveSelectedAddress(newSelectedAddress.address_id);
                    }
                } else {
                    setSelectedAddressId(null);
                    await AsyncStorage.removeItem('selectedAddressId');
                    getCurrentLocation();
                }
            }
        } catch (error) {
            console.error("Error deleting address:", error.message);
            Alert.alert("Error", "Failed to delete address. Please try again.");
        }
    }, [selectedAddressId, addresses, saveSelectedAddress]);

    const renderAddressItem = useCallback(({ item }) => {
        if (!item || typeof item.address_id === 'undefined') {
            return null;
        }

        const addressId = item.address_id.toString();

        return (
            <View style={HomeIndexStyles.addressListItemContainer}>
                <TouchableOpacity
                    style={[
                        HomeIndexStyles.addressListItem,
                        addressId === selectedAddressId ? HomeIndexStyles.selectedAddressItem : {}
                    ]}
                    onPress={() => {
                        setDisplayCurrentAddress(item.street + ", " + item.city);
                        setSelectedAddressId(addressId);
                        saveSelectedAddress(item.address_id);
                        setModalVisible(false);
                    }}
                >
                    <Text style={HomeIndexStyles.addressText}>{item.street + ", " + item.city}</Text>
                    {item.nickname && <Text style={HomeIndexStyles.addressNickname}>{item.nickname}</Text>}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => deleteAddress(item.address_id)}
                    style={HomeIndexStyles.deleteButton}
                >
                    <AntDesign name="delete" size={20} color="#e52850" />
                </TouchableOpacity>
            </View>
        );
    }, [selectedAddressId, saveSelectedAddress, deleteAddress]);

    const renderRecommendedRestaurant = useCallback(({ item }) => (
        <TouchableOpacity
            style={HomeIndexStyles.foodItemContainer}
            onPress={() => router.push({
                pathname: "/HotelPage",
                params: { id: item.id }
            })}
        >
            <View style={HomeIndexStyles.foodImageContainer}>
                <Image source={{ uri: item.featured_image }} style={HomeIndexStyles.foodImage} />
            </View>
            <View style={HomeIndexStyles.foodDetailsContainer}>
                <Text style={HomeIndexStyles.foodName}>{item.name}</Text>
                <Text style={HomeIndexStyles.foodType}>{item.cuisines}</Text>
                <View style={HomeIndexStyles.timeContainer}>
                    <Ionicons name="star" size={20} color="gold" />
                    <Text style={HomeIndexStyles.timeText}>{item.aggregate_rating}</Text>
                </View>
            </View>
        </TouchableOpacity>
    ), [router]);

    const renderExploreItem = useCallback(({ item }) => (
        <View style={HomeIndexStyles.itemsExplore}>
            <Image style={{ width: 70, height: 70 }} source={{ uri: item?.image }} />
            <Text style={HomeIndexStyles.itemsExploreName}>{item?.name}</Text>
            <Text style={HomeIndexStyles.itemsExploreDescription}>{item?.description}</Text>
        </View>
    ), []);

    const renderRestaurantItem = useCallback(({ item }) => (
        <Hotels item={item} />
    ), []);

    const filterRestaurants = (category, query) => {
        let filtered = restaurantData.restaurants;

        if (category) {
            filtered = filtered.filter(restaurant => {
                switch (category) {
                    case 'Free delivery':
                        return restaurant.free_delivery;
                    case 'rating 4.0+':
                        return restaurant.aggregate_rating > 4;
                    case 'Home Chefs':
                        return restaurant.is_home_chef;
                    case 'Panda Pro':
                        return restaurant.is_panda_pro;
                    default:
                        return true;
                }
            });
        }

        if (query) {
            const lowercaseQuery = query.toLowerCase();
            filtered = filtered.filter(restaurant =>
                restaurant.name.toLowerCase().includes(lowercaseQuery) ||
                restaurant.cuisines.toLowerCase().includes(lowercaseQuery)
            );
        }

        setFilteredRestaurants(filtered);
    };

    const handleSearch = (text) => {
        setSearchQuery(text);
        performSearch(text);
    };

    const performSearch = (query) => {
        if (query.length > 0) {
            const filtered = restaurantData.restaurants.filter(restaurant =>
                restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
                restaurant.cuisines.toLowerCase().toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(filtered);
            setShowSearchResults(true);
        } else {
            setSearchResults([]);
            setShowSearchResults(false);
        }
    };

    const handleSearchSubmit = () => {
        performSearch(searchQuery);
    };

    const handleSearchItemPress = (item) => {
        router.push({
            pathname: "/HotelPage",
            params: { id: item.id }
        });
        clearSearch();
    };

    const clearSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
        setShowSearchResults(false);
        if (searchInputRef.current) {
            searchInputRef.current.blur();
        }
    };

    const handleOutsidePress = () => {
        if (showSearchResults) {
            clearSearch();
        }
    };

    const ListHeaderComponent = useCallback(({ userProfile, avatarUrl }) => (
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
            <View>
                <View style={HomeIndexStyles.locationContainer}>
                    <Octicons name="location" size={24} color="#e52850" />
                    <TouchableOpacity
                        onPress={() => {
                            setModalVisible(true);
                            fetchUserAddresses();
                        }}
                        style={HomeIndexStyles.addressContainer}
                    >
                        <Text style={HomeIndexStyles.deliverToText}>Deliver To:</Text>
                        <Text style={HomeIndexStyles.addressText} numberOfLines={1} ellipsizeMode="tail">{displayCurrentAddress}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={HomeIndexStyles.pressable}
                        onPress={() => router.push("/Accounts")}
                    >
                        <View style={HomeIndexStyles.avatarPlaceholder}>

                            <Image
                                source={{ uri: avatarUrl || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" }}
                                style={[HomeIndexStyles.avatarPlaceholder, { overflow: 'hidden' }]}
                            />

                        </View>
                    </TouchableOpacity>
                </View>

                {/* Rest of the header remains the same */}
                <View style={HomeIndexStyles.searchContainer}>
                    <AntDesign name="search1" size={24} color="#ef2b50" />
                    <TextInput
                        ref={searchInputRef}
                        placeholder="Search for restaurants, cuisines..."
                        style={HomeIndexStyles.searchInput}
                        placeholderTextColor="grey"
                        value={searchQuery}
                        onChangeText={handleSearch}
                        onSubmitEditing={handleSearchSubmit}
                        returnKeyType="search"
                    />
                </View>
                {showSearchResults && (
                    <SearchResults
                        results={searchResults}
                        onItemPress={handleSearchItemPress}
                        onClearSearch={clearSearch}
                    />
                )}
                <Carousel />
                <Categories
                    categories={categoriesData}
                    selectedCategory={selectedCategory}
                    onSelectCategory={(category) => setSelectedCategory(category)}
                />

                <Text style={HomeIndexStyles.exploreText}>Recommended Restaurants</Text>
                <FlatList
                    data={restaurantData.restaurants.filter(restaurant => restaurant.recommended)}
                    renderItem={renderRecommendedRestaurant}
                    keyExtractor={(item) => `recommended-${item.id}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={HomeIndexStyles.recommendedList}
                />
                <Text style={HomeIndexStyles.exploreText}>EXPLORE</Text>

                <FlatList
                    data={items}
                    renderItem={renderExploreItem}
                    keyExtractor={(item, index) => `explore-${index}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ flexGrow: 0 }}
                />

                <Text style={HomeIndexStyles.hotelstag}>ALL RESTAURANTS</Text>
            </View>
        </TouchableWithoutFeedback>
    ), [displayCurrentAddress, fetchUserAddresses, renderRecommendedRestaurant, renderExploreItem, selectedCategory, searchQuery, searchResults, showSearchResults]);

    return (
        <UserProfileFetcher
            onError={(error) => {
                console.error("Profile fetch error:", error);
                Alert.alert("Error", "Could not load user profile");
            }}
        >
            {({ userProfile, avatarUrl }) => (
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={filteredRestaurants}
                        renderItem={renderRestaurantItem}
                        keyExtractor={(item) => item.id}
                        ListHeaderComponent={() => (
                            <ListHeaderComponent
                                userProfile={userProfile}
                                avatarUrl={avatarUrl}
                            />
                        )}
                        contentContainerStyle={HomeIndexStyles.container}
                    />

                    <Modal
                        visible={modalVisible}
                        animationType="slide"
                        transparent={true}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={HomeIndexStyles.modalOverlay}>
                            <View style={HomeIndexStyles.modalContent}>
                                <View style={HomeIndexStyles.modalHeader}>
                                    <Text style={HomeIndexStyles.modalTitle}>Select Address</Text>
                                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                                        <AntDesign name="close" size={24} color="#333" />
                                    </TouchableOpacity>
                                </View>
                                {isLoading ? (
                                    <Text style={HomeIndexStyles.loadingText}>Loading addresses...</Text>
                                ) : (
                                    <FlatList
                                        data={addresses}
                                        renderItem={renderAddressItem}
                                        keyExtractor={(item) => (item && item.address_id ? item.address_id.toString() : 'address_' + Math.random().toString())}
                                        style={HomeIndexStyles.addressList}
                                        ListEmptyComponent={
                                            <Text style={HomeIndexStyles.emptyListText}>No saved addresses</Text>
                                        }
                                    />
                                )}
                                <TouchableOpacity
                                    style={HomeIndexStyles.addAddressButton}
                                    onPress={() => {
                                        setModalVisible(false);
                                        router.push("/AddressScreen");
                                    }}
                                >
                                    <AntDesign name="plus" size={24} color="white" />
                                    <Text style={HomeIndexStyles.addAddressText}>Add New Address</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <CartButton />
                </View>
            )}
        </UserProfileFetcher>
    );
};

export default HomeIndex;
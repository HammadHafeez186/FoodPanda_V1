import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Alert, FlatList, TextInput, TouchableOpacity, Image, Modal } from "react-native";
import * as Location from "expo-location";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Octicons from "@expo/vector-icons/Octicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { supabase } from "../../lib/supabase";
import { useRouter } from "expo-router";
import { useIsFocused } from '@react-navigation/native';
import HomeIndexStyles from "../../Styles/HomeIndexStyles";
import { items, recommended, hotelData } from "../../data/HomeIndexData";
import Hotels from "../../components/Hotels";
import Categories from "../../components/Categories";
import Carousel from "../../components/Carousel";

const HomeIndex = () => {
    const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
    const [displayCurrentAddress, setDisplayCurrentAddress] = useState("Waiting for Current Location....");
    const [userInitial, setUserInitial] = useState("");
    const [addresses, setAddresses] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [userId, setUserId] = useState(null);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const isFocused = useIsFocused();

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
                setUserInitial(user.email.charAt(0).toUpperCase());
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

    const renderRecommendedItem = useCallback(({ item }) => (
        <View style={HomeIndexStyles.foodItemContainer}>
            <View style={HomeIndexStyles.foodImageContainer}>
                <Image source={{ uri: item?.image }} style={HomeIndexStyles.foodImage} />
            </View>
            <View style={HomeIndexStyles.foodDetailsContainer}>
                <Text style={HomeIndexStyles.foodName}>{item?.name}</Text>
                <Text style={HomeIndexStyles.foodType}>{item?.type}</Text>
                <View style={HomeIndexStyles.timeContainer}>
                    <Ionicons name="time" size={20} color="black" />
                    <Text style={HomeIndexStyles.timeText}>{item?.time} mins</Text>
                </View>
            </View>
        </View>
    ), []);

    const renderExploreItem = useCallback(({ item }) => (
        <View style={HomeIndexStyles.itemsExplore}>
            <Image style={{ width: 50, height: 50 }} source={{ uri: item?.image }} />
            <Text style={HomeIndexStyles.itemsExploreName}>{item?.name}</Text>
            <Text style={HomeIndexStyles.itemsExploreDescription}>{item?.description}</Text>
        </View>
    ), []);

    const renderHotelItem = useCallback(({ item }) => <Hotels item={item} />, []);

    const ListHeaderComponent = useCallback(() => (
        <>
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
                        <Text style={HomeIndexStyles.userInitialText}>
                            {userInitial || "N"}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={HomeIndexStyles.searchContainer}>
                <AntDesign name="search1" size={24} color="#ef2b50" />
                <TextInput
                    placeholder="Search for Mighty Zinger, Deals, etc"
                    style={HomeIndexStyles.searchInput}
                    placeholderTextColor="grey"
                />
            </View>

            <Categories />
            <Carousel />

            <FlatList
                data={recommended}
                renderItem={renderRecommendedItem}
                keyExtractor={(item, index) => `recommended-${index}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ flexGrow: 0 }}
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
        </>
    ), [displayCurrentAddress, userInitial, fetchUserAddresses, renderRecommendedItem, renderExploreItem]);

    return (
        <>
            <FlatList
                data={hotelData}
                renderItem={renderHotelItem}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={ListHeaderComponent}
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
        </>
    );
};

export default HomeIndex;


import { StyleSheet, View, Text, Alert, FlatList, Pressable, TextInput, Image } from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import Octicons from '@expo/vector-icons/Octicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Carousel from "../../components/Carousel";
import Categories from "../../components/Categories";
import Ionicons from '@expo/vector-icons/Ionicons';
import { items, recommended, hotelData } from "../../data/HomeIndexData";
import Hotels from "../../components/Hotels";
import HomeIndexStyles from "../../Styles/HomeIndexStyles";

const HomeIndex = () => {
    const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
    const [displayCurrentAddress, setDisplayCurrentAddress] = useState("Waiting for Current Location....");

    useEffect(() => {
        checkIfLocationEnabled();
        getCurrentLocation();
    }, []);

    const checkIfLocationEnabled = async () => {
        const enabled = await Location.hasServicesEnabledAsync();
        if (!enabled) {
            Alert.alert(
                "Location Services not enabled",
                "This app requires access to your location.",
                [{ text: "OK", cancelable: false }]
            );
        } else {
            setLocationServicesEnabled(true);
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

    const renderRecommendedItem = ({ item }) => (
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
    );

    const renderExploreItem = ({ item }) => (
        <View style={HomeIndexStyles.itemsExplore}>
            <Image style={{ width: 50, height: 50 }} source={{ uri: item?.image }} />
            <Text style={HomeIndexStyles.itemsExploreName}>{item?.name}</Text>
            <Text style={HomeIndexStyles.itemsExploreDescription}>{item?.description}</Text>
        </View>
    );

    const renderHotelItem = ({ item }) => <Hotels item={item} />;

    return (
        <FlatList
            data={hotelData}
            renderItem={renderHotelItem}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={() => (
                <>
                    <View style={HomeIndexStyles.locationContainer}>
                        <Octicons name="location" size={24} color="#e52850" />
                        <View style={HomeIndexStyles.addressContainer}>
                            <Text style={HomeIndexStyles.deliverToText}>Deliver To:</Text>
                            <Text style={HomeIndexStyles.addressText}>{displayCurrentAddress}</Text>
                        </View>
                        <Pressable style={HomeIndexStyles.pressable}>
                            <Text>S</Text>
                        </Pressable>
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
            )}
            contentContainerStyle={HomeIndexStyles.container}
        />
    );
};

export default HomeIndex;

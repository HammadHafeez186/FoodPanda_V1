import { StyleSheet, View, Text, Alert, ScrollView, Pressable, TextInput, Image } from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import Octicons from '@expo/vector-icons/Octicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Carousel from "../../components/Carousel";
import Categories from "../../components/Categories";
import Ionicons from '@expo/vector-icons/Ionicons';
import items from "../../data/items.json";
import recommended from "../../data/recommended.json";
import hotelData from "../../data/hotelData.json";
import Hotels from "../../components/Hotels";

const Index = () => {
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

    return (
        <ScrollView style={styles.container}>
            <View style={styles.locationContainer}>
                <Octicons name="location" size={24} color="#e52850" />
                <View style={styles.addressContainer}>
                    <Text style={styles.deliverToText}>Deliver To:</Text>
                    <Text style={styles.addressText}>{displayCurrentAddress}</Text>
                </View>
                <Pressable style={styles.pressable}>
                    <Text>S</Text>
                </Pressable>
            </View>

            <View style={styles.searchContainer}>
                <AntDesign name="search1" size={24} color="#ef2b50" />
                <TextInput
                    placeholder="Search for Mighty Zinger, Deals, etc"
                    style={styles.searchInput}
                    placeholderTextColor="grey"
                />
            </View>

            <Carousel />
            <Categories />

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {recommended.map((item, index) => ( //replace with list view
                    <View style={styles.foodItemContainer} key={index}> // separete component for render item
                        <View style={styles.foodImageContainer}>
                            <Image
                                source={{ uri: item?.image }}
                                style={styles.foodImage}
                            />
                        </View>

                        <View style={styles.foodDetailsContainer}>
                            <Text style={styles.foodName}>{item?.name}</Text>
                            <Text style={styles.foodType}>{item?.type}</Text>

                            {/* Move the time below food type */}
                            <View style={styles.timeContainer}>
                                <Ionicons name="time" size={20} color="black" />
                                <Text style={styles.timeText}>{item?.time} mins</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <Text style={styles.exploreText}>EXPLORE</Text>

            {/* Fixed the explore section */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}> // flatList
                {items.map((item, index) => (
                    <View key={index} style={styles.itemsExplore}>
                        <Image style={{ width: 50, height: 50 }} source={{ uri: item?.image }} />
                        <Text style={styles.itemsExploreName}>{item?.name}</Text>
                        <Text style={styles.itemsExploreDescription}>{item?.description}</Text>
                    </View>
                ))}
            </ScrollView>
            <Text style={styles.hotelstag}>ALL RESTAURANTS</Text>
            <View style={styles.hotelsStartContainer}>
                {hotelData.map((item, index) => (
                    <Hotels key={index} item={item} />
                ))}

            </View>

        </ScrollView>
    );
};

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8"
    },
    locationContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        padding: 10
    },
    addressContainer: {
        flex: 1
    },
    deliverToText: {
        fontSize: 15,
        fontWeight: "500"
    },
    addressText: {
        fontSize: 16,
        color: "grey",
        marginTop: 3
    },
    pressable: {
        backgroundColor: "#6cb4ee",
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#c0c0c0",
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 11,
        marginTop: 10,
        marginHorizontal: 10
    },
    searchInput: {
        color: "black",
        flex: 1,
        marginLeft: 10
    },

    // Updated styles for food items
    foodItemContainer: {
        backgroundColor: "white",
        flexDirection: "row",
        margin: 10,
        borderRadius: 8,
        elevation: 3, // Optional: for shadow effect
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    foodImageContainer: {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 7,
        overflow: "hidden", // To prevent image from overflowing corners
    },
    foodImage: {
        width: 100,
        height: 100,
        resizeMode: "cover",
    },
    foodDetailsContainer: {
        flex: 1,
        justifyContent: "flex-start",
        marginLeft: 10,
        paddingVertical: 5,
    },
    foodName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    foodType: {
        fontSize: 14,
        color: "grey",
        marginBottom: 10
    },
    timeContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },
    timeText: {
        fontSize: 14,
        color: "#555",
    },
    exploreText: {
        textAlign: "center",
        marginTop: 7,
        letterSpacing: 5,
        marginBottom: 5,
        color: "grey"
    },
    itemsExplore: {
        width:90,
        borderColor:"#E0E0E0",
        borderWidth:1,
        paddingVertical:5,
        paddingHorizontal:1,
        borderRadius:5,
        marginLeft:10,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"white"

    },
    itemsExploreName: {
        fontSize: 13,
        fontWeight:"500",
        marginTop:6,
    },
    itemsExploreDescription: {
        fontSize:12,
        color:"grey",
        marginTop:3,
        textAlign:"center"
    },
    hotelstag: {
        textAlign: "center",
        marginTop: 8,
        letterSpacing: 5,
        marginBottom: 5,
        color: "grey"
    },
    hotelsStartContainer: {
        marginHorizontal:8
    }

});

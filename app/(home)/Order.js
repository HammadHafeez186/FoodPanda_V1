import React, { useRef, useState, useEffect, useCallback } from "react";
import { Text, View, SafeAreaView, TouchableOpacity, Pressable, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import moment from "moment";
import MapView, { Marker, Polyline } from "react-native-maps";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { styles } from "../../Styles/orderStyles";
import * as Location from 'expo-location';
import { useSelector, useDispatch } from 'react-redux';
import { cleanCart } from "../../redux/CartReducer";
import restaurantData from "../../data/dataRestaurantMenu.json";

const Order = () => {
    const params = useLocalSearchParams();
    const [tip, setTip] = useState(0);
    const orderTime = moment();
    const time = orderTime.format("LT");
    const mapView = useRef(null);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const router = useRouter();
    const dispatch = useDispatch();

    const [canCancelOrder, setCanCancelOrder] = useState(true);
    const [orderCancelled, setOrderCancelled] = useState(false);

    const { currentHotelId } = useSelector((state) => state.cart);
    const currentRestaurant = restaurantData.restaurants.find(r => r.id === currentHotelId || r.id === params.currentHotelId);

    const hotelLocation = currentRestaurant
        ? { latitude: currentRestaurant.latitude, longitude: currentRestaurant.longitude }
        : { latitude: 31.4708, longitude: 74.2728 };

    const requestLocationPermission = useCallback(async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return false;
        }
        return true;
    }, []);

    const getCurrentLocation = useCallback(async () => {
        try {
            let currentLocation = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });
            
            setLocation({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
            });
        } catch (error) {
            setErrorMsg('Error getting location: ' + error.message);
        }
    }, []);

    const watchLocation = useCallback(async () => {
        const locationSubscription = await Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.Balanced,
                timeInterval: 5000,
                distanceInterval: 10,
            },
            (newLocation) => {
                setLocation({
                    latitude: newLocation.coords.latitude,
                    longitude: newLocation.coords.longitude,
                });
            }
        );

        return locationSubscription;
    }, []);

    useEffect(() => {
        let locationSubscription;

        const setupLocation = async () => {
            const hasPermission = await requestLocationPermission();
            if (hasPermission) {
                await getCurrentLocation();
                locationSubscription = await watchLocation();
            }
        };

        setupLocation();

        const checkCancellationWindow = () => {
            const currentTime = moment();
            const timeDiff = currentTime.diff(orderTime, 'minutes');
            
            if (timeDiff >= 5) {
                setCanCancelOrder(false);
            }
        };

        checkCancellationWindow();
        const intervalId = setInterval(checkCancellationWindow, 60000);

        return () => {
            clearInterval(intervalId);
            if (locationSubscription) {
                locationSubscription.remove();
            }
        };
    }, [requestLocationPermission, getCurrentLocation, watchLocation]);

    const getCoordinates = useCallback(() => {
        if (!location) return [];
        return [
            {
                latitude: location.latitude,
                longitude: location.longitude,
            },
            hotelLocation
        ];
    }, [location, hotelLocation]);

    const centerMap = useCallback(() => {
        const coordinates = getCoordinates();
        if (mapView.current && coordinates.length > 0) {
            mapView.current.fitToCoordinates(coordinates, {
                edgePadding: {
                    top: 50,
                    bottom: 50,
                    left: 50,
                    right: 50,
                },
                animated: true,
            });
        }
    }, [getCoordinates]);

    useEffect(() => {
        if (location) {
            centerMap();
        }
    }, [location, centerMap]);

    const handleCancelOrder = useCallback(() => {
        if (!canCancelOrder) {
            Alert.alert(
                "Cannot Cancel Order",
                "You can only cancel an order within 5 minutes of placing it."
            );
            return;
        }

        Alert.alert(
            "Cancel Order",
            "Are you sure you want to cancel this order?",
            [
                {
                    text: "No",
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: () => {
                        setOrderCancelled(true);
                        router.replace("/MainPage");
                    }
                }
            ]
        );
    }, [canCancelOrder, router]);

    const handleOrderReceived = useCallback(() => {
        dispatch(cleanCart());
        router.replace("/ReviewPage");
    }, [dispatch, router]);

    if (orderCancelled) {
        return null;
    }

    if (!currentRestaurant) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Restaurant not found</Text>
                <TouchableOpacity onPress={() => router.replace("/MainPage")} style={styles.errorButton}>
                    <Text style={styles.errorButtonText}>Go back to main page</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerText}>Delivery in 25 mins</Text>
                    <Text style={styles.subHeaderText}>Order placed at {time}</Text>
                </View>
                <TouchableOpacity onPress={() => router.push("./Help")}>
                    <Text style={styles.helpText}>HELP</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.mapContainer}>
                <MapView
                    ref={mapView}
                    initialRegion={{
                        latitude: hotelLocation.latitude,
                        longitude: hotelLocation.longitude,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    }}
                    style={styles.map}
                >
                    <Marker 
                        coordinate={hotelLocation}
                        title="Restaurant"
                    >
                        <View style={styles.markerContainer}>
                            <FontAwesome5 name="store" size={20} color="white" />
                        </View>
                    </Marker>

                    {location && (
                        <Marker
                            coordinate={location}
                            title="You"
                        >
                            <View style={styles.markerContainer}>
                                <FontAwesome5 name="user" size={20} color="white" />
                            </View>
                        </Marker>
                    )}

                    {location && (
                        <Polyline
                            coordinates={getCoordinates()}
                            strokeColor="#fd5c63"
                            lineDashPattern={[4]}
                            strokeWidth={2}
                        />
                    )}
                </MapView>

                <TouchableOpacity 
                    style={styles.centerButton} 
                    onPress={centerMap}
                >
                    <Ionicons name="locate" size={20} color="white" />
                    <Text style={styles.centerButtonText}>Center Map</Text>
                </TouchableOpacity>

                {errorMsg && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{errorMsg}</Text>
                    </View>
                )}

                <View style={styles.coordinatesContainer}>
                    <Text style={styles.coordinatesText}>
                        Restaurant Coordinates: 
                        {`\nLatitude: ${hotelLocation.latitude.toFixed(4)}`}
                        {`\nLongitude: ${hotelLocation.longitude.toFixed(4)}`}
                    </Text>
                </View>
            </View>

            <View style={styles.tipContainer}>
                <View style={styles.tipContent}>
                    <Text style={styles.tipTextCenter}>
                        {currentRestaurant.name} has accepted your order
                    </Text>

                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity
                            onPress={handleCancelOrder}
                            style={[
                                styles.cancelButton,
                                !canCancelOrder && styles.disabledCancelButton
                            ]}
                            disabled={!canCancelOrder}
                        >
                            <Text style={styles.cancelOrderText}>
                                {canCancelOrder 
                                    ? 'Cancel Order' 
                                    : 'Order Cannot Be Cancelled'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.tipRow}>
                        <FontAwesome5
                            name="hand-holding-heart"
                            size={28}
                            color="#fc8019"
                        />
                        <View style={styles.tipDetails}>
                            <Text style={styles.tipTitle}>Tip your hunger savior</Text>
                            <Text style={styles.tipDescription}>
                                Thank your delivery partner for helping you stay safe indoors.
                                Show your appreciation with a tip.
                            </Text>
                            <Pressable style={styles.tipOptions}>
                                {[30, 50, 70].map((amount) => (
                                    <TouchableOpacity
                                        key={amount}
                                        activeOpacity={0.6}
                                        onPress={() => setTip(amount)}
                                        style={[
                                            styles.tipButton,
                                            tip === amount && styles.selectedTipButton,
                                        ]}
                                    >
                                        <View style={styles.tipButtonContent}>
                                            <Text
                                                style={[styles.tipAmount, tip === amount && styles.selectedTipText]}
                                            >
                                                Rs. {amount}
                                            </Text>
                                            {amount === 50 && <Text style={styles.mostTipped}>Most Tipped</Text>}
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </Pressable>
                        </View>
                    </View>
                    {tip > 0 && (
                        <View>
                            <Text style={styles.tipPayment}>
                                Please pay Rs. {tip} to your delivery agent at the time of
                                delivery.
                            </Text>
                            <TouchableOpacity
                                onPress={() => setTip(0)}
                                activeOpacity={0.7}
                                style={styles.cancelTip}
                            >
                                <Text style={styles.cancelText}>(Cancel)</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>

            <View style={styles.orderReceivedContainer}>
                <TouchableOpacity
                    style={styles.orderReceivedButton}
                    onPress={handleOrderReceived}
                >
                    <Text style={styles.orderReceivedButtonText}>
                        Order Received
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Order;


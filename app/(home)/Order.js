import { Text, View, SafeAreaView, TouchableOpacity, Pressable, Alert } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import moment from "moment";
import MapView, { Marker, Polyline } from "react-native-maps";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { styles } from "../../Styles/orderStyles";
import * as Location from 'expo-location';

const Order = () => {
    const params = useLocalSearchParams();
    const [tip, setTip] = useState(0);
    const orderTime = moment();
    const time = orderTime.format("LT");
    const mapView = useRef(null);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const router = useRouter();

    // New state for order cancellation
    const [canCancelOrder, setCanCancelOrder] = useState(true);
    const [orderCancelled, setOrderCancelled] = useState(false);

    const hotelLocation = {
        latitude: 31.4708,
        longitude: 74.2728,
    };

    useEffect(() => {
        (async () => {
            // Request location permissions
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            try {
                // Get current location
                let currentLocation = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.Balanced,
                });
                
                setLocation({
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude,
                });

                // Start watching position
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

                return () => {
                    if (locationSubscription) {
                        locationSubscription.remove();
                    }
                };
            } catch (error) {
                setErrorMsg('Error getting location: ' + error.message);
            }
        })();

        // Check cancellation window
        const checkCancellationWindow = () => {
            const currentTime = moment();
            const timeDiff = currentTime.diff(orderTime, 'minutes');
            
            if (timeDiff >= 5) {
                setCanCancelOrder(false);
            }
        };

        // Check immediately
        checkCancellationWindow();

        // Set up an interval to check periodically
        const intervalId = setInterval(checkCancellationWindow, 60000); // Check every minute

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    // Get coordinates for polyline
    const getCoordinates = () => {
        if (!location) return [];
        return [
            {
                latitude: location.latitude,
                longitude: location.longitude,
            },
            hotelLocation
        ];
    };

    const centerMap = () => {
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
    };

    useEffect(() => {
        if (location) {
            centerMap();
        }
    }, [location]);

    const handleCancelOrder = () => {
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
                        router.replace("/MainPage");
                    }
                }
            ]
        );
    };

    // If order is cancelled, return null or a placeholder
    if (orderCancelled) {
        return null;
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerText}>Delivery in 25 mins</Text>
                    <Text style={styles.subHeaderText}>Order placed at {time}</Text>
                </View>
                <TouchableOpacity onPress={() => router.push("/Help")}>
                    <Text style={styles.helpText}>HELP</Text>
                </TouchableOpacity>
            </View>

            {/* Map */}
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
                    {/* Hotel Marker */}
                    <Marker 
                        coordinate={hotelLocation}
                        title="Restaurant"
                    >
                        <View style={{
                            backgroundColor: '#fc8019',
                            padding: 5,
                            borderRadius: 20,
                        }}>
                            <FontAwesome5 name="store" size={20} color="white" />
                        </View>
                    </Marker>

                    {/* User Location Marker */}
                    {location && (
                        <Marker
                            coordinate={location}
                            title="You"
                        >
                            <View style={{
                                backgroundColor: '#4A89F3',
                                padding: 5,
                                borderRadius: 20,
                            }}>
                                <FontAwesome5 name="user" size={20} color="white" />
                            </View>
                        </Marker>
                    )}

                    {/* Route Line */}
                    {location && (
                        <Polyline
                            coordinates={getCoordinates()}
                            strokeColor="#fd5c63"
                            lineDashPattern={[4]}
                            strokeWidth={2}
                        />
                    )}
                </MapView>

                {/* Center Button */}
                <TouchableOpacity 
                    style={styles.centerButton} 
                    onPress={centerMap}
                >
                    <Ionicons name="locate" size={20} color="white" />
                    <Text style={styles.centerButtonText}>Center Map</Text>
                </TouchableOpacity>

                {/* Error Message */}
                {errorMsg && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{errorMsg}</Text>
                    </View>
                )}
            </View>

            {/* Tip Section */}
            <View style={styles.tipContainer}>
                <View style={styles.tipContent}>
                    <Text style={styles.tipTextCenter}>
                        {params?.name} has accepted your order
                    </Text>

                    {/* Cancellation Option */}
                    <View style={{
                        marginTop: 10,
                        marginBottom: 10,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity
                            onPress={handleCancelOrder}
                            style={{
                                backgroundColor: canCancelOrder ? '#FF2B85' : '#cccccc',
                                padding: 10,
                                borderRadius: 5,
                                opacity: canCancelOrder ? 1 : 0.5
                            }}
                            disabled={!canCancelOrder}
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                {canCancelOrder 
                                    ? 'Cancel Order' 
                                    : 'Order Cannot Be Cancelled'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Tip Section */}
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
                                <TouchableOpacity
                                    activeOpacity={0.6}
                                    onPress={() => setTip(30)}
                                    style={[
                                        styles.tipButton,
                                        tip === 30 && styles.selectedTipButton,
                                    ]}
                                >
                                    <Text
                                        style={[styles.tipAmount, tip === 30 && styles.selectedTipText]}
                                    >
                                        Rs. 30
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.6}
                                    onPress={() => setTip(50)}
                                    style={[
                                        styles.tipButton,
                                        tip === 50 && styles.selectedTipButton,
                                    ]}
                                >
                                    <View style= {{alignItems: "center"}}>
                                    <Text
                                        style={[styles.tipAmount, tip === 50 && styles.selectedTipText]}
                                    >
                                        Rs. 50
                                    </Text>
                                    <Text style={styles.mostTipped}>Most Tipped</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.6}
                                    onPress={() => setTip(70)}
                                    style={[
                                        styles.tipButton,
                                        tip === 70 && styles.selectedTipButton,
                                    ]}
                                >
                                    <Text
                                        style={[styles.tipAmount, tip === 70 && styles.selectedTipText]}
                                    >
                                        Rs. 70
                                    </Text>
                                </TouchableOpacity>
                            </Pressable>
                        </View>
                    </View>
                    {tip ? (
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
                    ) : null}
                </View>
            </View>

            <View style={{ alignItems: "center", marginTop: 20 }}>
    <TouchableOpacity
        style={{
            backgroundColor: "#FF2B85",
            borderRadius: 25,
            paddingVertical: 12,
            paddingHorizontal: 30,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 5,
            paddingBelow: 100,
        }}
        onPress={() => router.replace("/ReviewPage")}
    >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            Order Received
        </Text>
    </TouchableOpacity>
</View>

        </SafeAreaView>
    );
};

export default Order;
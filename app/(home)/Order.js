import { Text, View, SafeAreaView, TouchableOpacity, Pressable } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import moment from "moment";
import MapView, { Marker, Polyline } from "react-native-maps";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { styles } from "../../Styles/orderStyles";

const Order = () => {
    const params = useLocalSearchParams();
    const [tip, setTip] = useState(0);
    const time = moment().format("LT");
    const mapView = useRef(null);
    const [coordinates] = useState([
        {
            latitude: 12.9716,
            longitude: 77.5946,
        },
        {
            latitude: 13.0451,
            longitude: 77.6269,
        },
    ]);

    const centerMap = () => {
        if (mapView.current) {
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
        centerMap();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerText}>Delivery in 25 mins</Text>
                    <Text style={styles.subHeaderText}>Order placed at {time}</Text>
                </View>
                <TouchableOpacity>
                    <Text style={styles.helpText}>HELP</Text>
                </TouchableOpacity>
            </View>

            {/* Map */}
            <View style={styles.mapContainer}>
                <MapView
                    ref={mapView}
                    initialRegion={{
                        latitude: 12.9716,
                        longitude: 77.5946,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}
                    style={styles.map}
                >
                    <Marker coordinate={coordinates[0]} />
                    <Marker coordinate={coordinates[1]} />
                    <Polyline
                        coordinates={coordinates}
                        strokeColor="#fd5c63"
                        lineDashPattern={[4]}
                        strokeWidth={2}
                    />
                </MapView>

                {/* Center Button */}
                <TouchableOpacity style={styles.centerButton} onPress={centerMap}>
                    <Ionicons name="locate" size={20} color="white" />
                    <Text style={styles.centerButtonText}>Center Map</Text>
                </TouchableOpacity>
            </View>

            {/* Tip Section */}
            <View style={styles.tipContainer}>
                <View style={styles.tipContent}>
                    <Text style={styles.tipTextCenter}>
                        {params?.name} has accepted your order
                    </Text>
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
                                    <Text
                                        style={[styles.tipAmount, tip === 50 && styles.selectedTipText]}
                                    >
                                        Rs. 50
                                    </Text>
                                    <Text style={styles.mostTipped}>Most Tipped</Text>
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
        </SafeAreaView>
    );
};

export default Order;
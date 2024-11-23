import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Pressable } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import moment from "moment";
import MapView, { Marker, Polyline } from "react-native-maps";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

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

    // Center the map to fit the coordinates
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white", // Updated to white background
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 60,
        backgroundColor: "#fd5c63",
        paddingHorizontal: 15,
    },
    headerText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    subHeaderText: {
        color: "white",
        fontSize: 14,
    },
    helpText: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
    },
    mapContainer: {
        position: "relative",
    },
    map: {
        width: "100%",
        height: 400,
    },
    centerButton: {
        position: "absolute",
        bottom: 15,
        right: 15,
        backgroundColor: "#fd5c63",
        borderRadius: 25,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 15,
        paddingVertical: 10,
        elevation: 5,
    },
    centerButtonText: {
        color: "white",
        marginLeft: 5,
        fontWeight: "bold",
        fontSize: 14,
    },
    tipContainer: {
        height: 320,
        backgroundColor: "white", // Ensure tip container has white background too
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 10,
    },
    tipContent: {
        flex: 1,
    },
    tipTextCenter: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 15,
    },
    tipRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 15,
    },
    tipDetails: {
        marginLeft: 15,
        flex: 1,
    },
    tipTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    tipDescription: {
        fontSize: 14,
        color: "#7d7d7d",
    },
    tipOptions: {
        flexDirection: "row",
        marginTop: 15,
    },
    tipButton: {
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 5,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
    },
    tipAmount: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#002D62",
    },
    mostTipped: {
        marginTop: 5,
        fontSize: 12,
        fontWeight: "bold",
        color: "orange",
        backgroundColor: "#fff0e0",
        paddingHorizontal: 5,
        borderRadius: 5,
    },
    selectedTipButton: {
        backgroundColor: "#fd5c63",
        borderColor: "#fd5c63",
    },
    selectedTipText: {
        color: "white",
    },
    tipPayment: {
        marginTop: 15,
        fontSize: 14,
        color: "#fc8019",
        textAlign: "center",
    },
    cancelTip: {
        marginTop: 5,
        alignSelf: "center",
        width: "40%", // To control the width
        paddingVertical: 10, // Add some vertical padding for better height
        borderRadius: 25, // Rounded corners
        borderWidth: 2, // Border width
        borderColor: "red", // Red border
        backgroundColor: "red", // Red background color
        alignItems: "center", // Center the text inside the button
        justifyContent: "center", // Center vertically
    },
    cancelText: {
        color: "white", // White text
        fontSize: 16, // Adjust text size
        fontWeight: "bold", // Make text bold
    },
});

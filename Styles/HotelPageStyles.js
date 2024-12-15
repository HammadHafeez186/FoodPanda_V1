import { StyleSheet } from "react-native";

const HotelPageStyles = StyleSheet.create({
    // General Styles
    mainContainer: {
        backgroundColor: "white",
        flexGrow: 1,
        paddingBottom: 20,
    },
    arrowContainer: {
        marginTop: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
    },
    ionicons: {
        padding: 5,
        marginHorizontal: 10,
    },
    threeIconsContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        gap: 10,
        justifyContent: "space-around",
        width: 100,
    },

    // Header Section
    paramsOuterContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 12,
        padding: 15,
        backgroundColor: "#f8f8f8",
    },
    nameText: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 5,
    },
    descriptionText: {
        marginTop: 5,
        color: "gray",
        fontWeight: "500",
        fontSize: 15,
    },
    aggregateOuterContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginTop: 10,
    },
    aggregate_ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FF2B85",
        borderRadius: 4,
        paddingHorizontal: 4,
        paddingVertical: 5,
        gap: 4,
    },
    aggregateText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
    },
    ratingTextStyle: {
        fontSize: 15,
        fontWeight: "500",
        marginLeft: 5,
        color: "#666",
    },
    waitTimeContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FF2B85",
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 12,
    },

    // Cart Section
    cartText: {
        textAlign: "center",
        color: "white",
        fontSize: 15,
        fontWeight: "500",
    },
    cartPressableContainer: {
        position: "absolute",
        bottom: 10,
        left: 10,
        right: 10,
        backgroundColor: "#FF2B85",
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        elevation: 5,
    },
    cartItemsMin: {
        textAlign: "center",
        color: "white",
        marginTop: 5,
        fontWeight: "600",
    },

    // Pressable Styles
    menuButton: {
        borderRadius: 4,
        paddingHorizontal: 7,
        paddingVertical: 5,
        marginVertical: 10,
        marginHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#FF2B85",
        borderWidth: 1,
    },
    menuPressable: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        right: 25,
        backgroundColor: "#FF2B85",
    },
    menuPressableText: {
        textAlign: "center",
        color: "white",
        fontWeight: "500",
        fontSize: 11,
        marginTop: 3,
    },

    // Modal Styles
    modalContainer: {
        height: 190,
        width: 250,
        backgroundColor: "#FF2B85",
        position: "absolute",
        bottom: 35,
        right: 10,
        borderRadius: 7,
        padding: 10,
    },
    modalText: {
        color: "white",
        fontWeight: "600",
        fontSize: 18,
    },
    modalImage: {
        width: "65%",
        height: 75,
        resizeMode: "cover",
        alignSelf: "center",
        marginVertical: 10,
        marginBottom: 5,
    },
    customizeButton: {
        backgroundColor: '#FF2B85', // Customize the color
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    customizeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    mapContainer: {
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    }
    
});

export default HotelPageStyles;

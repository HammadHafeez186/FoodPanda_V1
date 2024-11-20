// styles/HotelPageStyles.js
import { StyleSheet } from "react-native";

const HotelPageStyles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "white",
        flexGrow: 1,
    },
    threeIconsContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        gap: 10,
    },
    arrowContainer: {
        marginTop: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    ionicons: {
        padding: 5,
    },
    aggregate_ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#006a4e",
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
    },
    paramsOuterContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 12,
    },
    nameText: {
        fontSize: 20,
        fontWeight: "bold",
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
    waitTimeContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d0f0c0",
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 12,
    },
    cartText: {
        textAlign: "center",
        color: "white",
        fontSize: 15,
        fontWeight: "500",
    },
    cartPressableContainer: {
        backgroundColor: "#fd5c63",
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    cartItemsMin: {
        textAlign: "center",
        color: "white",
        marginTop: 5,
        fontWeight: "600",
    },
});

export default HotelPageStyles;

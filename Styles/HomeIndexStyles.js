import { StyleSheet } from "react-native";

const IndexStyles = StyleSheet.create({
    container: {
        backgroundColor: "#f8f8f8",
    },
    locationContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        padding: 10,
    },
    addressContainer: {
        flex: 1,
    },
    deliverToText: {
        fontSize: 15,
        fontWeight: "500",
    },
    addressText: {
        fontSize: 16,
        color: "grey",
        marginTop: 3,
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
        marginHorizontal: 10,
    },
    searchInput: {
        color: "black",
        flex: 1,
        marginLeft: 10,
    },
    foodItemContainer: {
        backgroundColor: "white",
        flexDirection: "row",
        margin: 10,
        borderRadius: 8,
        elevation: 3,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    foodImageContainer: {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 7,
        overflow: "hidden",
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
        marginBottom: 10,
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
        color: "grey",
    },
    itemsExplore: {
        width: 90,
        borderColor: "#E0E0E0",
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 1,
        borderRadius: 5,
        marginLeft: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
    itemsExploreName: {
        fontSize: 13,
        fontWeight: "500",
        marginTop: 6,
    },
    itemsExploreDescription: {
        fontSize: 12,
        color: "grey",
        marginTop: 3,
        textAlign: "center",
    },
    hotelstag: {
        textAlign: "center",
        marginTop: 8,
        letterSpacing: 5,
        marginBottom: 5,
        color: "grey",
    },
});

export default IndexStyles;

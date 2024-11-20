import { StyleSheet } from 'react-native';

const MenuItemStyles = StyleSheet.create({
    starRatingText: {
        marginTop: 5,
        borderRadius: 4,
    },
    pressableContainer: {
        margin: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 15,
    },
    imageStyle: {
        width: 120,
        height: 120,
        borderRadius: 8,
    },
    itemDescriptionText: {
        width: 200,
        marginTop: 8,
        color: "gray",
        fontSize: 16,
    },
    nameText: {
        fontSize: 18,
        fontWeight: "600",
        width: 220,
    },
    priceText: {
        marginTop: 4,
        fontSize: 15,
        fontWeight: "500",
    },
    pressableImageContainer: {
        marginRight: 10,
    },
    pressableButtonContainer: {
        position: "absolute",
        top: 95,
        left: 20,
        borderColor: "#a32636",
        borderWidth: 1,
        flexDirection: "row",
        paddingHorizontal: 25,
        paddingVertical: 5,
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 5,
    },
    addButtonText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#fd5c63",
    },
    quantityContainer: {
        position: "absolute",
        top: 95,
        left: 10,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fd5c63",
        borderRadius: 5,
        borderColor: "#a32636",
        borderWidth: 1,
    },
    quantityButton: {
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    quantityButtonText: {
        fontSize: 18,
        fontWeight: "600",
        color: "white",
    },
    quantityText: {
        fontSize: 18,
        fontWeight: "600",
        color: "white",
        paddingHorizontal: 10,
    },
});

export default MenuItemStyles;

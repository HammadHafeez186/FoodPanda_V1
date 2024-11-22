import { StyleSheet } from "react-native";

const CartStyles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        backgroundColor: "#f8f9fa",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10,
    },
    deliveryContainer: {
        backgroundColor: "white",
        padding: 15,
        marginTop: 15,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    deliveryText: {
        fontWeight: "500",
        fontSize: 14,
    },
    sectionTitleContainer: {
        marginVertical: 12,
    },
    sectionTitle: {
        textAlign: "center",
        letterSpacing: 3,
        fontSize: 16,
        color: "grey",
    },
    cartItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
        padding: 15,
        marginVertical: 5,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    itemName: {
        flex: 1,
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: "600",
        color: "#d70000",
        paddingHorizontal: 10,
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal:6
    },
    quantityButton: {
        backgroundColor: "#f0f8ff",
        padding: 5,
        borderRadius: 5,
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        elevation: 2,
    },
    quantityButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    quantityText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
    },
    deliveryInstructionHeading: {
        fontSize: 16,
        fontWeight: "600",
    },
    deliveryIconPressable: {
        margin: 10,
        borderRadius: 10,
        padding: 10,
        backgroundColor: "white",
    },
    deliveryInstructionView: {
        justifyContent: "center",
        alignItems: "center",
    },
    deliveryInstructionText: {
        width: 75,
        fontSize: 13,
        color: "#383838",
        paddingTop: 10,
        textAlign: "center",
    },
    outerViewCircleAddMoreItems: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginTop: 10,
    },
    innerViewCircleAddMoreItems: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    optionText: {
        paddingVertical: 3,
    },
});

export default CartStyles;

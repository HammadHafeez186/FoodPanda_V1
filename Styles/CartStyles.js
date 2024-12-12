import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
    deliveryContainer: {
        backgroundColor: "#f1f1f1",
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
    },
    deliveryText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    sectionTitleContainer: {
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    cartItem: {
        backgroundColor: "#fff",
        padding: 15,
        marginBottom: 15,
        borderRadius: 8,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    itemName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    itemPrice: {
        fontSize: 14,
        color: "#555",
        marginVertical: 5,
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
    },
    quantityButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: "#ddd",
        borderRadius: 5,
    },
    quantityButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    quantityText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        marginHorizontal: 10,
    },
    customizeButton: {
        marginTop: 10,
        backgroundColor: "#fd5c63",
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    customizeButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    addonSection: {
        backgroundColor: "#f5f5f5",
        padding: 10,
        marginTop: 10,
        borderRadius: 8,
    },
    addonTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
        marginBottom: 5,
    },
    addonItem: {
        fontSize: 14,
        color: "#555",
    },
    deliveryInstructionHeading: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    deliveryIconPressable: {
        marginRight: 20,
    },
    deliveryInstructionView: {
        flexDirection: "row",
        alignItems: "center",
    },
    deliveryInstructionText: {
        fontSize: 14,
        marginLeft: 10,
        color: "#333",
    },
    billingContainer: {
        backgroundColor: "#f9f9f9",
        padding: 15,
        marginTop: 20,
        borderRadius: 8,
    },
    billingTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    billingDetails: {
        marginTop: 10,
    },
    billingRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
    },
    placeOrderButton: {
        backgroundColor: "#fd5c63",
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
        alignItems: "center",
    },
    placeOrderText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#fff",
    },
    placeOrderSubText: {
        fontSize: 14,
        fontWeight: "400",
        color: "#fff",
        marginBottom: 5,
    },
    placeOrderButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
    },
});

export default styles;

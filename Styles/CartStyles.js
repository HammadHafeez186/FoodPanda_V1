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
        color: "#FF2B85",
    },
    deliveryContainer: {
        backgroundColor: "#FF2B85",
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
    },
    deliveryText: {
        fontSize: 16,
        fontWeight: "600",
        color: "white",
    },
    sectionTitleContainer: {
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FF2B85",
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
        backgroundColor: "#FF2B85",
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
    deliveryInstructionsContainer: {
        marginTop: 20,
        marginBottom: 10,
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
    selectedInstruction: {
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        padding: 5,
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
        backgroundColor: "#FF2B85",
        padding: 15,
        borderRadius: 8,
        marginTop: 10,
        alignItems: "center",
    },
    placeOrderText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#fff",
        paddingTop: 5
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
        paddingTop: 5,
        alignSelf: "center",
    },
    emptyCartText: {
        fontSize: 16,
        color: "#333",
        textAlign: "center",
        marginTop: 20,
    },
    removeButton: {
        backgroundColor: "#ff4d4d",
        padding: 8,
        borderRadius: 5,
        marginTop: 10,
    },
    removeButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
        textAlign: "center",
    },
    addonsContainer: {
        marginTop: 10,
    },
    addonsTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
        marginBottom: 5,
    },
    footer: {
        marginTop: 20,
    },
    paymentMethod: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        padding: 15,
        borderRadius: 8,
    },
    paymentMethodTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    paymentMethodSubtitle: {
        fontSize: 14,
        color: "#666",
    },
    placeOrderButtonContent: {
        alignItems: "center",
    },
    totalText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    totalAmount: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FF2B85",
    },
});

export default styles;


import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        paddingTop: 40,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
        marginBottom: 30,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
    itemContainer: {
        marginHorizontal: 20,
        marginBottom: 20,
    },
    itemTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
    },
    itemDescription: {
        fontSize: 16,
        color: "#777",
        marginTop: 5,
    },
    addonItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        marginVertical: 10,
        padding: 15,
        marginHorizontal: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
    },
    addonSelected: {
        backgroundColor: "#d6f4d6",
        borderWidth: 2,
        borderColor: "#4CAF50",
    },
    addonImage: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginRight: 15,
    },
    addonInfo: {
        flex: 1,
    },
    addonName: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
    },
    addonPrice: {
        fontSize: 16,
        color: "#777",
        marginTop: 5,
    },
    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: -2 },
        shadowRadius: 5,
    },
    placeOrderButton: {
        backgroundColor: "#4CAF50",
        paddingVertical: 15,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    placeOrderButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 20,
    },
    closeButton: {
        fontSize: 18,
        fontWeight: "600",
        color: "#fff",
        backgroundColor: "#4CAF50",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
});

export default styles;

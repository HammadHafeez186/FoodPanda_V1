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
        maxWidth: '80%',
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
    avatarImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#ccc", 
    },
    userInitialText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    avatarPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#6cb4ee',
        justifyContent: "center",
        alignItems: "center",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    addressList: {
        maxHeight: '70%',
    },
    addressListItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    emptyListText: {
        textAlign: 'center',
        padding: 20,
        color: 'gray',
    },
    addAddressButton: {
        backgroundColor: '#FF2B85',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        margin: 15,
        borderRadius: 10,
    },
    addAddressText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    addressListItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    deleteButton: {
        backgroundColor: '#f8d7da',
        borderRadius: 5,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchResultsContainer: {
        position: 'absolute',
        top: 100, // Adjust this value based on your layout
        left: 10,
        right: 10,
        zIndex: 1000,
    },
    
});

export default IndexStyles;


import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: '#f9f9f8',
    },
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        backgroundColor: '#FFFFFF',
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333',
    },
    optionsButton: {
        padding: 8,
    },
    contentContainer: {
        flex: 1,
        padding: 16,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    headerTextStyle: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: '700',
        marginBottom: 30,
        color: '#333',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333333',
    },
    orderContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginBottom: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    orderDate: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
    },
    reorderButton: {
        backgroundColor: '#FF2B85',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
    },
    reorderButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    orderItem: {
        marginBottom: 8,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    itemName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333333',
    },
    itemQuantity: {
        fontSize: 14,
        color: '#666666',
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: '500',
        color: '#FF2B85',
    },
    addonsContainer: {
        marginTop: 4,
    },
    addonsTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#666666',
    },
    addonItem: {
        fontSize: 12,
        color: '#888888',
    },
    emptyStateText: {
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    logoutButton: {
        backgroundColor: '#FF2B85',
        paddingVertical: 12,
        borderRadius: 4,
        alignItems: 'center',
    },
    logoutButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    primaryButton: {
        backgroundColor: '#FF2B85',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    secondaryButton: {
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    dangerButton: {
        backgroundColor: '#ff3b30',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        fontWeight: '700',
        color: 'white',
        fontSize: 16,
    },
    textInput: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    inputLabel: {
        fontSize: 14,
        marginBottom: 5,
        color: '#333',
    },
    warningText: {
        color: '#ff3b30',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
});

export default styles

import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    // Safe Area Container
    safeAreaContainer: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },

    // Main Container
    container: {
        flex: 1,
        padding: 20,
    },

    // Back Button
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButtonText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#fd5c63',
    },

    // Form Container
    formContainer: {
        flex: 1,
        justifyContent: 'center',
    },

    // Header Text
    headerTextStyle: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: '700',
        marginBottom: 30,
        color: '#333',
    },

    // Button Styles
    primaryButton: {
        backgroundColor: '#fd5c63',
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
    buttonText: {
        fontWeight: '700',
        color: 'white',
        fontSize: 16,
    },

    // TextInput Styles
    textInput: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },

    // Specific Input Styles
    emailInput: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    passwordInput: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },

    // Miscellaneous
    inputLabel: {
        fontSize: 14,
        marginBottom: 5,
        color: '#333',
    },
})

export default styles

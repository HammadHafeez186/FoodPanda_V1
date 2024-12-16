import { StyleSheet, Dimensions } from 'react-native'

const PRIMARY_COLOR = '#FF2B85'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    logo: {
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').height * 0.125,
        resizeMode: 'contain',
    },
    headingContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    subHeadingFont: {
        fontSize: 18,
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
    },
    inputContainer: {
        marginBottom: 15,
        width: '100%',
    },
    label: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 5,
    },
    textInput: {
        color: 'gray',
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    registerButton: {
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 6,
        padding: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    registerButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    loginRedirect: {
        marginTop: 15,
        alignItems: 'center',
    },
    loginText: {
        color: PRIMARY_COLOR,
        fontWeight: 'bold',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        textAlign: 'center',
        marginVertical: 10,
    },
    successText: {
        color: 'green',
        fontSize: 14,
        textAlign: 'center',
        marginVertical: 10,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    otpInput: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: PRIMARY_COLOR,
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 18,
        color: PRIMARY_COLOR,
    },
})

export default styles

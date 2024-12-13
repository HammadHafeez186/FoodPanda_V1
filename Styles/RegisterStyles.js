import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    headerTextStyle: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    safeAreaContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    mainView: {
        marginTop: 50,
    },
    subHeadingFont: {
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 12,
        color: 'red',
        alignItems:"center"
    },
    textInputView: {
        marginTop: 30,
        alignItems: 'center',
    },
    inputContainer: {
        marginTop: 15,
        width: 300,
    },
    label: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 5,
    },
    textInput: {
        color: 'gray',
        backgroundColor: '#e0e0e0',
        padding: 10,
        borderRadius: 5,
    },
    pressableContainer: {
        width: 200,
        backgroundColor: '#fd5c63',
        borderRadius: 6,
        marginTop: 30,
        padding: 15,
    },
    registerButtonText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
    },
    loginRedirect: {
        marginTop: 20,
    },
    loginText: {
        textAlign: 'center',
        color: 'gray',
        fontWeight: 'bold',
        fontSize: 16,
    },
})

export default styles
